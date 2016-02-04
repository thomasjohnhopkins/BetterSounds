class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false, index: true
      t.integer :track_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
