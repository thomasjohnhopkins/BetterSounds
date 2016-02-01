class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.user_id == nil
      @comment.user_id = current_user.id
    end

    if @comment.save!
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
    comment = Comment.find_by(params[id])
    to_be_destoryed = comment

    if to_be_destoryed
      comment.destroy
      render json: to_be_destoryed
    else
      render json: comment.errors.full_messages
    end
  end

  private
  def comment_params
    params
      .require(:comment)
      .permit(:body, :user_id, :track_id)
  end
end
