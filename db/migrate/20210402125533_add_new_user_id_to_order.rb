class AddNewUserIdToOrder < ActiveRecord::Migration[6.0]
  def change
    remove_column :orders, :user_id
    add_reference :orders, :users, null: false, foreign_key: true
  end
end
