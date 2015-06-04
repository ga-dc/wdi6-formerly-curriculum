VendingMachine::Application.routes.draw do
  resources :skus, only: [:index, :create, :show, :update, :destroy]

  root to: 'pages#vending_machine'
  get '/manage', to: 'pages#stock_manager'
end
