class Api::UserLikesController < ApplicationController

  def create
    @user_like = UserLike.new(user_like_params)

    if @user_like.save!
      render :show
    else
      render json: @user_like.errors.full_messages
    end
  end

  def index
    @user_likes = UserLike.all

    render :index
  end

  def destroy
    user_like = UserLike.find(params[:id])
    to_be_destoryed = user_like

    if to_be_destoryed
      user_like.destroy
      render json: to_be_destoryed
    else
      render json: user_like.errors.full_messages
    end
  end

  private
  def user_like_params
    params.require(:user_like).permit(:user_id, :track_id)
  end
end
