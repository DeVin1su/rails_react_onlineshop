class FixColumnNameOrder2 < ActiveRecord::Migration[6.0]
  def change
    rename_column :orders, :users_id, :user_id
  end
end
