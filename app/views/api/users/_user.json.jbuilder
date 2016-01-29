json.extract! user, :id, :username, :description, :email
json.image_url asset_path(user.image.url)
