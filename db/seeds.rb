# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Product.count <= 0
  9.times do |i|
      Product.create(
        name: "Product #{i + 1}",
        description: 'Top quality product',
        price: (i + 1) * 100
      )
    end
end

roleAdmin = Role.find_or_initialize_by(id: 1)
roleAdmin.name = 'Admin'
roleAdmin.save!

rolaUser = Role.find_or_initialize_by(id: 2)
rolaUser.name = 'Default user'
rolaUser.save!

user = User.find_or_initialize_by(login: 'admin')
user.name = 'Adminname'
user.surname = 'Adminsurname'
user.login = 'admin'
user.password = 'admin'
user.role_id = 1
user.save!