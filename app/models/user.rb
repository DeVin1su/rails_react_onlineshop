class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :surname, presence: true
  validates :login, presence: true
  validates :password, presence: true

  belongs_to :role
end
