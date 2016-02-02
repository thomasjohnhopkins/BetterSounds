class Api::UserFollowsController < ApplicationController

  def create
    @user_follow = UserFollow.new(user_follow_params)
    
    if @user_follow.save!
      render :show
    else
      render json: @user_follow.errors.full_messages
    end
  end

  def destroy
    user_follow = UserFollow.find_by(params[id])
    to_be_destoryed = user_follow

    if to_be_destoryed
      user_follow.destroy
      render json: to_be_destoryed
    else
      render json: user_follow.errors.full_messages
    end
  end

  private
  def user_follow_params
    params.require(:user_follow).permit(:user_id, :track_id)
  end
end
