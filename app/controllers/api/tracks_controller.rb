class Api::TracksController < ApplicationController

  def create

    track = Track.new(track_params)
    track.user_id = current_user.id

    if track.save!
      render json: track
    end
  end

  def destroy
    track = Track.find_by(params[id])
    to_be_destoryed = track

    if to_be_destoryed
      track.destroy
      render json: to_be_destoryed
    end
  end

  def index
    tracks = Track.all

    render json: tracks
  end

  def show
    track = Track.find_by(params[id])

    render json: track
  end

  private
  def track_params
    params
      .require(:track)
      .permit(:title, :artist, :sound_url)
  end
end
