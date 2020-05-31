urls = [
  "https://bigbinary.com",
  "https://twitter.com/prateekcodes",
  "https://altcampus.io",
  "https://PrateekCodes.com",
  "https://dashboard.heroku.com/",
  "https://learnrubyonrails.bigbinary.com",
  "https://github.com/PrateekCodes/url-shortener",
  "https://linkedin.com/in/prateekcodes",
]

Url.destroy_all

urls.each do |url|
  @url = Url.new(original: url)
  @url.save
end
