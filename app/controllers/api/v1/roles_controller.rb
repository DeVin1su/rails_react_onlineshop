class Api::V1::RolesController < ApplicationController
  def index
    role = Role.all.order(created_at: :desc)
    render json: role
  end
end
