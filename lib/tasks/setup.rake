desc "Ensure that code is not running in production environment"
task :not_production do
  if Rails.env.production? && ENV["DELETE_PRODUCTION_DATA"].blank?
    puts ""
    puts "*" * 50
    puts "Deleting production data is not allowed. "
    puts "If you really want to delete all production data and populate sample data then "
    puts "you can execute following command."
    puts "DELETE_PRODUCTION_DATA=1 rake setup_sample_data"
    puts " "
    puts "If you are using Heroku then execute command as shown below"
    puts "heroku run rake setup_sample_data DELETE_PRODUCTION_DATA=1 -a app_name"
    puts "*" * 50
    puts ""
    throw :error
  end
end

desc "Sets up the project by running migration and populating sample data"
task setup: [:environment, :not_production, "db:drop", "db:create", "db:migrate"] do
  ["setup_sample_data"].each { |cmd| system "rake #{cmd}" }
end

def delete_all_records_from_all_tables
  ActiveRecord::Base.connection.schema_cache.clear!

  Dir.glob(Rails.root + "app/models/*.rb").each { |file| require file }

  ApplicationRecord.descendants.each do |klass|
    klass.reset_column_information
    klass.destroy_all
  end
end

desc "Deletes all records and populates sample data"
task setup_sample_data: [:environment, :not_production] do
  delete_all_records_from_all_tables

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

  visit = [
    2.month.ago,
    5.month.ago,
    Time.now
  ]

  urls.each do |url|
    @url = Url.create(original: url)
    for i in 0..rand(3)
      Visit.create(url_id: @url.id, visited_at: visit[i])
    end
  end

  puts "sample data was added successfully"
end
