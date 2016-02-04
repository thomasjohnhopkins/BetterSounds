class Api::TaggingsController < ApplicationController
  def index
    @taggings = Tagging.all.where(track_id: params[:id])

    render :index
  end

  def create
    @tagging = Tagging.new(tagging_params)

    if @tagging.save!
      render :show
    else
      render json: @tagging.errors.full_messages
    end
  end

  private
  def tagging_params
    params.require(:tagging).permit(:tag_id, :track_id)
  end
end
