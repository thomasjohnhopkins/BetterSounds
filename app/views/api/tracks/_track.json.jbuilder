json.extract! track, :id, :title, :artist, :created_at, :user_id,
  :play_count, :user_follows, :user_likes, :taggings
json.audio_url asset_path(track.audio.url)
json.image_url asset_path(track.image.url)

json.tags do
  json.partial! 'api/tags/tag',
    collection: track.tags, as: :tag
end
