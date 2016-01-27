class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.integer :user_id, null: false
      t.string :sound_url, null: false

      t.timestamps null: false
    end

  add_index :tracks, :user_id
  end
end
