namespace :app do

  session = ActionDispatch::Integration::Session.new(Rails.application)
  root_url = "https://localhost:3000/"

  desc "encode short url"
  task encode: :environment do
    session.post root_url, params: { "url": { "original_url": ENV["URL"] } } 
    res = JSON.parse(session.response.body)
    if res["success"]
      puts "The shortened url of #{ENV["URL"]} is #{root_url+res["short_url"]}."
    else
      puts res["errors"]
    end
  end

  desc "decode short url"
  task decode: :environment do
    short_url = ENV["SHORTURL"].last(8)
    session.get "#{root_url+"/"+short_url}"
    res = JSON.parse(session.response.body)
    if res["success"]
      puts "The original url of short url #{ENV["SHORTURL"]} is #{res["original_url"]}"
    else
      puts "No original url was found for the  short url #{ENV["SHORTURL"]}"
    end
  end

end
