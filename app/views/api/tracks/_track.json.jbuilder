json.extract! track, :id, :title, :artist, :created_at, :user_id,
  :play_count, :user_follows, :user_likes, :taggings, :tags
json.audio_url asset_path(track.audio.url)
