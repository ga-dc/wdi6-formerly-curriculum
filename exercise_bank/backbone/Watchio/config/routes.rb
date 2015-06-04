Watchio::Application.routes.draw do
  root 'app#index'
  resources :movies, except: [:new, :edit]
end