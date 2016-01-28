class RemoveSoundUrlFromTracks < ActiveRecord::Migration
  def change
    remove_column :tracks, :sound_url
  end
end
