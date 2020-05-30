class Api::V1::ReportsController < ApplicationController

  def index
    @visits = Visit.all.group_by { |t| t.visited_at.strftime("%B %Y")} 
    @visit_count = @visits.map{ | key,value | [key, value.length]}.to_h
    render status: :ok, json: { visits: @visit_count }
  end

end
