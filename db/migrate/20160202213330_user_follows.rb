class UserFollows < ActiveRecord::Migration
  def change
    create_table :user_follows do |t|
      t.integer :track_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :user_follows, :track_id
    add_index :user_follows, :user_id
    add_index(
      :user_follows, [:track_id, :user_id], unique: true
    )
  end
end
