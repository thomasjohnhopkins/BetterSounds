class CreateUserLikes < ActiveRecord::Migration
  def change
    create_table :user_likes do |t|

      t.timestamps null: false
    end
  end
end
