Rails.application.routes.draw do
  root to: 'static_pages#root'

  get 'auth/facebook/callback', to: 'api/sessions#omniauth_facebook'
  get 'auth/twitter/callback', to: 'api/sessions#omniauth_twitter'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :index]
    resource :session,  only: [:show, :create, :destroy]
    resources :tracks, only: [:create, :destroy, :index, :show, :update] do
      resources :comments, :only => [:create, :destroy, :index]
    end
    resources :user_follows, :only => [:create, :index, :destroy]
    resources :user_likes, :only => [:create, :index, :destroy]
    resources :tags, only: :index
    resources :taggings, only: :index
  end
end
