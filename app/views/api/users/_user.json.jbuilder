json.extract! user, :id, :username, :description
json.image_url asset_path(user.image.url)
