class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.float :amount, null: false

      t.timestamps
    end
    
    create_table :orders_products, id: false do |t|
      t.belongs_to :orders, null: false
      t.belongs_to :products, null: false
      t.integer :quantity, null: false
    end
  end
end
