class CreateUserLikes < ActiveRecord::Migration
  def change
    create_table :user_likes do |t|
      t.integer :track_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :user_likes, :track_id
    add_index :user_likes, :user_id
    add_index(
      :user_likes, [:track_id, :user_id], unique: true
    )
  end
end
