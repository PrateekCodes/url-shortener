Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'urls/:short' => "urls#show", as: :short
      resources :urls, only: [ :index, :create, :update]
      resources :categories, only: [ :index, :create, :update, :destroy]
      resources :reports, only: :index
    end
  end
  root 'static#index'
  get '/*path' => 'static#index'
end
