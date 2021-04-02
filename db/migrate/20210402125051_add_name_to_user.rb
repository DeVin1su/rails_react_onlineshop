class AddNameToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string, null: false
    add_column :users, :surname, :string, null: false
    add_reference :users, :role, null: false, foreign_key: true
  end
end
