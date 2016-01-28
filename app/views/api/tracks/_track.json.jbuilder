json.extract! track, :id, :title, :artist
json.audio_url asset_path(track.audio.url)
