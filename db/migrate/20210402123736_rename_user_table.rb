class RenameUserTable < ActiveRecord::Migration[6.0]
  def change
    rename_table :users, :users2
  end
end
