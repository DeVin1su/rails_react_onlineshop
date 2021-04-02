Rails.application.routes.draw do
  
  # devise_scope :sessions do
  #   get 'api/v1/users/get', to: "api/v1/sessions#get"
  # end
  
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :users
      devise_for :users, path: '', path_names: {sign_in: "login", sign_out: "logout"},
                                      controllers: {registrations: "api/v1/registrations", sessions: 'api/v1/sessions'}
    end
  end
  
  # devise_for :users, controllers: { registrations: 'users', sessions: 'sessions' }


  # devise_scope :sessions do
  #   get 'users/get', to: "devise/sessions#get"
  # end

  namespace :api do
    namespace :v1 do
      get 'currentuser', to: 'current_user#index'
    end
  end

  namespace :api do
    namespace :v1 do
      get 'orders/index'
      post 'orders/create'
      get 'orders/show/:id', to: 'orders#show'
    end
  end

  # namespace :api do
  #   namespace :v1 do
  #     post 'login', to: 'sessions#create'
  #     get 'login', to: 'sessions#get'
  #     delete 'logout', to: 'sessions#destroy'
  #   end
  # end

  namespace :api do
    namespace :v1 do
      get 'roles/index'
    end
  end

  # namespace :api do
  #   namespace :v1 do
  #     get 'users/index'
  #     post 'users/create'
  #     get 'users/show/:id', to: 'users#show'
  #     patch 'users/:id', to: 'users#update'
  #     delete 'users/destroy/:id', to: 'users#destroy'
  #   end
  # end

  namespace :api do
    namespace :v1 do
      get 'products/index'
      post 'products/create'
      get 'products/show/:id', to: 'products#show'
      delete 'products/destroy/:id', to: 'products#destroy'
    end
  end

  root 'homepage#index'  
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
