class Category < ApplicationRecord
  before_save { self.title = title.downcase }
  has_many :urls, dependent: :nullify
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  VALID_HEX_COLOR_REGEX = /\A#?(?:[A-F0-9]{3}){1,2}\z/i
  validates :color, presence: true, length: { is: 7 }, format: { with: VALID_HEX_COLOR_REGEX, message: "Please enter valid color" }
end
