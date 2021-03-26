class Order < ApplicationRecord
  # has_and_belongs_to_many :products
    has_many :order_products
    has_many :products, through: :order_products
    belongs_to :user
end
