class Api::UsersController < ApplicationController
  def create

    user = User.new(user_params)
    debugger

    if user.save!
      log_in!(user)
      render json: user
    end
  end

  def show
    user = User.find_by(params[id])

    render json: user
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :description)
  end

end
