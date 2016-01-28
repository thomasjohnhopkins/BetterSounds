class Api::SessionsController < ApplicationController
  def create

    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user.nil?
      # flash errors?
      # a failure message
    else
      log_in!(@user)
      render 'api/users/show'
    end
  end

  def destroy
    log_out!
    # a success message
  end
end
