class FixColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :orders_products, :orders_id, :order_id
    rename_column :orders_products, :products_id, :product_id
  end
end
