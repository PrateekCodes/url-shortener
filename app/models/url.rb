class Url < ApplicationRecord
  validates :url, presence: true, uniqueness: true, format: { with: URI::regexp(%w[http https]), message: "Please enter valid URL."}
  validates :short_url, presence: true, uniqueness: true, length: { is: 8 }
end
