class Visit < ApplicationRecord
  before_validation :set_visit_time, if: Proc.new { |visit| !visit.visited_at? }
  belongs_to :url
  validates :url_id, presence: true
  
  private
    def set_visit_time
      self.visited_at = Time.zone.now
    end
end
