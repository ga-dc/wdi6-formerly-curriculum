Hogwarts::Application.routes.draw do
 
root "house#index"
resource :house, only: [:index, :show]
resources :students, only: [:index, :show]

end
