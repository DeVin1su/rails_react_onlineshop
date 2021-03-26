class RenameOrdersProducts < ActiveRecord::Migration[6.0]
  def change
    rename_table :orders_products, :order_products
  end
end
