class Url < ApplicationRecord
  has_many :visits, dependent: :destroy
  belongs_to :category, optional: true
  validates :original, presence: true, uniqueness: true, format: { with: URI::regexp(%w[http https]), message: "Please enter valid URL"}
  validates :short, presence: true, uniqueness: true, length: { is: 8 }
  validates :pinned, inclusion: { in: [true, false], message: "Value must be true or false" }

  def generate_short_url
    loop do
      self.short = SecureRandom.alphanumeric(8)
      break unless Url.exists?( short: self.short )
    end
  end
end
