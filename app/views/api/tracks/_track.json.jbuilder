json.extract! track, :id, :title, :artist, :created_at
json.audio_url asset_path(track.audio.url)
