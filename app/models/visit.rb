class Visit < ApplicationRecord
  before_create :set_visit_time
  belongs_to :url
  validates :url_id, presence: true
  
  private
    def set_visit_time
      self.visited_at = Time.zone.now
    end
end
