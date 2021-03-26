class AddDetailsToOrder < ActiveRecord::Migration[6.0]
  def change
    add_reference :orders, :users, null: false, foreign_key: true

    change_column_default :products, :image, 'https://raw.githubusercontent.com/DeVin1su/public/main/U0360294_big.jpg'
  end
end
