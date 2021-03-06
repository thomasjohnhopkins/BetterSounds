class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save!
      log_in!(@user)
      render :show
    else
      render json: "Sorry. The required fields were not completed, please try again."
    end
  end

  def index
    @users = User.all

    render :index
  end

  def show
    @user = User.find_by(params[id])

    render :show
  end

  def update
    @user = User.find_by_id(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages
    end
  end

  private
  def user_params
    params
      .require(:user)
      .permit(:username, :email, :password,
        :description, :image, :website, :bio)
  end

end
