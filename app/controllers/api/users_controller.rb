class Api::UsersController < ApplicationController
  def create
    user = User.new(bench_params)

    if user.save!
      render json: bench
    end
  end

  def show
    user = User.find_by(params[id])

    render json: user
  end

  private
  def user_params
   params
    .require(:user)
    .permit(:username, :email, :password, :description, :image_url)
  end
end
