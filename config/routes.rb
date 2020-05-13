Rails.application.routes.draw do
  post '/' => 'urls#create'
  get '/:short_url' => 'urls#show'
end
