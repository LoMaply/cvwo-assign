Rails.application.routes.draw do
  get 'authentication/login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root 'pages#index'

  post '/login', to: 'authentication#login'
  post '/load', to: 'authentication#load'

  namespace :api do
    resources :users
    resources :discussions
    resources :comments, only: [:create, :update, :destroy]
  end

  get '*path', to: 'pages#index', via: :all

end
