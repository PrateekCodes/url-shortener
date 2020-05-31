class Api::V1::ReportsController < ApplicationController

  def index
    @visits = Visit.all.group_by { |t| t.visited_at.strftime("%B %Y")} 
    visits = @visits.map{ |key, value| [key, value.length] }.to_h
    render status: :ok, json: {visits: visits}
  end

end
