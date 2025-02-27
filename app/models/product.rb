class Product < ApplicationRecord
    validates :name, presence: true
    validates :description, presence: true
    validates :price, presence: true

    # has_and_belongs_to_many :orders
    has_many :order_products
    has_many :orders, through: :order_products
end
