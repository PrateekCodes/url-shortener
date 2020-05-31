class Api::V1::UrlsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @urls = Url.order(pinned: :desc, created_at: :desc)
    @visits = Visit.all.group_by { |t| t.url_id}
    visits = @visits.map{ |key, value| [key, value.length] }.to_h
    categories = {}
    Category.all.each do |category|
      categories[category.id] = category
    end
    render status: :ok, json: { urls: @urls, categories: categories, visits: visits }
  end

  def create
    @url = Url.find_by(url_params)

    if @url
      render status: :ok, json: { short_url: @url.short }
    else
      @url = Url.new(url_params)
      @url.generate_short_url
      if @url.save
        render status: :created, json: { short_url: @url.short }
      else
        render status: :unprocessable_entity, json: { errors: @url.errors.full_messages }
      end
    end
  end

  def show
    @url = Url.find_by_short(params[:short])

    if @url
      url_visit(@url.id)
      render status: :ok, json: { original_url: @url.original }
    else
      render status: :not_found, json: { error: "Not found" }
    end
  end

  def update
    @url = Url.find(params[:id])

    if @url.update(url_params)
      render status: :ok, json: { updated_url: @url }
    else
      render status: :unprocessable_entity, json: { errors: @url.errors.full_messages }
    end
  end

  private
    def url_params
      params.require(:url).permit(:original, :pinned, :category_id)
    end
    
    def url_visit(id)
      Visit.create(url_id: id)
    end
end
