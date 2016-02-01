Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resource :session,  only: [:show, :create, :destroy]
    resources :tracks, only: [:create, :destroy, :index, :show] do
      resources :comments, :only => [:create, :destroy]
    end
  end
end
