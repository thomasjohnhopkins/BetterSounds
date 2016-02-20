class Api::SessionsController < ApplicationController
  def show

    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user.nil?
      render json: "Wrong email/password combo!", status: 401
    else
      log_in!(@user)
      render 'api/users/show'
    end
  end

  def destroy
    log_out!
    render json: ["Successfully signed out"], status: 200
  end

  def omniauth_facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    log_in!(@user)
    redirect_to root_url + '#/'
  end

  def omniauth_twitter
    @user = User.find_or_create_by_auth_hash(auth_hash)
    log_in!(@user)
    redirect_to root_url + '#/'
  end

  private
  def auth_hash
    request.env['omniauth.auth']
  end
end
