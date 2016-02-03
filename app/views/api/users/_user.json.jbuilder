json.extract! user, :id, :username, :description, :email, :bio, :website
json.image_url asset_path(user.image.url)
json.user_follows do
  json.partial! 'api/user_follows/user_follow',
    collection: user.user_follows, as: :user_follow
end
