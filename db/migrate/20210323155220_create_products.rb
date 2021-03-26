class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :image, default: 'https://raw.githubusercontent.com/DeVin1su/public/main/6c41c035-7a91-11e3-ac6e-c8600053e8c8.png'
      t.float :price, null: false

      t.timestamps
    end
  end
end
