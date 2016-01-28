class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save!
      log_in!(@user)
      render :show
    else
      render json: user.errors.full_messages
    end
  end

  def show
    @user = User.find_by(params[id])

    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :description, :image)
  end

end
