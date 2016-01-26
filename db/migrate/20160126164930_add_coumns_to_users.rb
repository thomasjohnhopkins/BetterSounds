class AddCoumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string, null: false
    add_column :users, :description, :string
    add_column :users, :image_url, :string
  end
end
