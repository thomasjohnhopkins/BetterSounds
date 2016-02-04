class Api::TracksController < ApplicationController

  def create
    @track = Track.new(track_params)
    if @track.user_id == nil
      @track.user_id = current_user.id
    end

    if @track.save!
      render :show
    else
      render json: @track.errors.full_messages
    end
  end

  def destroy
    track = Track.find(params[:id])
    to_be_destoryed = track

    if to_be_destoryed
      track.destroy
      render json: to_be_destoryed
    else
      render json: track.errors.full_messages
    end
  end

  def index
    @tracks = Track.all

    render :index
  end

  def show
    @track = Track.find_by(params[id])

    render json: @track
  end

  def update
    Tagging.where(track_id: params[:id]).destroy_all
    @track = Track.find(params[:id])

    if @track.update(track_params)
      render :show
    else
      render json: @track.errors.full_messages
    end
  end

  private
  def track_params
    params
      .require(:track)
      .permit(:title, :artist, :audio, :play_count, :tag_ids => [])
  end
end
