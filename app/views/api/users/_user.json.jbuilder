json.extract! user, :id, :username, :description, :email, :bio, :website
json.image_url asset_path(user.image.url)
