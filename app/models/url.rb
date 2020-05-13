class Url < ApplicationRecord
  validates :url, presence: true, uniqueness: true, format: { with: URI::regexp(%w[http https]), message: "Please enter valid URL."}
  validates :short_url, presence: true, uniqueness: true, length: { is: 8 }

  def generate_short_url
    loop do
      self.short_url = SecureRandom.alphanumeric(8)
      break unless Url.exists?( short_url: self.short_url )
    end
  end
end
