class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :surname, null: false
      t.string :login, null: false
      t.string :password, null: false

      t.timestamps
    end
  end
end
