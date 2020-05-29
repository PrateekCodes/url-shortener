namespace :app do

  session = ActionDispatch::Integration::Session.new(Rails.application)
  include Rails.application.routes.url_helpers
  
  desc "encode original url"
  task encode: :environment do
    url_path = api_v1_urls_url(host: "https://localhost:3000")
    session.post url_path, params: { "url": { "original": ENV["URL"] } } 
    res = JSON.parse(session.response.body)
    status_code = session.response.status
    if status_code == 200 || status_code == 201
      puts "The shortened url of #{ENV["URL"]} is #{ENV['ROOT_URL']+res["short_url"]}."
    else
      puts res["errors"]
    end
  end

  desc "decode short url"
  task decode: :environment do
    url_path = api_v1_urls_url(host: "https://localhost:3000")
    short_url = ENV["SHORTURL"].last(8)
    session.get "#{url_path+"/"+short_url}"
    res = JSON.parse(session.response.body)
    status_code = session.response.status
    if status_code == 200
      puts "The original url of short url #{ENV["SHORTURL"]} is #{+res["original_url"]}"
    else
      puts "No original url was found for the short url #{ENV["SHORTURL"]}"
    end
  end

end
