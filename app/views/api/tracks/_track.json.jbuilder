json.extract! track, :id, :title, :artist, :audio
json.audio_url asset_path(track.audio.url)
