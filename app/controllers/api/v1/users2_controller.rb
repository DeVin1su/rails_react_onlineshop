class Api::V1::Users2Controller < ApplicationController
  def index
    user = User2.all.order(created_at: :desc)
    render json: user
  end

  def create
    user = User2.create!(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def update
    if user
      if params.has_key?(:name)
        user.name = params[:name]
      end
      if params.has_key?(:surname)
        user.surname = params[:surname]
      end
      if params.has_key?(:login)
        user.login = params[:login]
      end
      if params.has_key?(:password)
        user.password = params[:password]
      end
      user.save

      render json: user, include: ['role']
    else
      render json: user.errors
    end
  end

  def show
    if user
      render json: user, include: ['role']
    else
      render json: user.errors
    end
  end

  def destroy
    user&.destroy
    render json: { message: 'User deleted!' }
  end

  private

  def user_params
    params.permit(:name, :surname, :login, :password, :role_id)
  end
  
  def user
    @user ||= User2.includes(:role).find(params[:id])
  end
end
