class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.all

    render :index
  end

  def create
    @comment = Comment.new(comment_params)

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
