class Api::V1::CategoriesController < ApplicationController

  def index
    @categories = Category.order( created_at: :desc)
    render status: :ok, json: { categories: @categories }
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      render status: :created, json: { category: @category }
    else
      render status: :unprocessable_entity, json: { errors: @category.errors.full_messages }
    end
  end

  def update
    @category = Category.find_by_title(params[:title])

    if @category.update(category_params)
      render status: :ok, json: { category: @category }
    else
      render status: :unprocessable_entity, json: { @category.errors.full_messages }
    end
  end

  def destroy
    @category = Category.find_by_title(params[:title])

    if @category.destroy
      render status: :ok
    else
      render status: :unprocessable_entity, json: { @category.errors.full_messages }
  end

  private
    def category_params
      params.require(:category).permit(:title, :color)
    end
end
