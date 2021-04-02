class Api::V1::RegistrationsController < Devise::RegistrationsController
  # def index
  #   user = User.all.order(created_at: :desc)
  #   render json: user
  # end

  def create
    user = User.create!(user_params)
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
      if params.has_key?(:email)
        user.login = params[:email]
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

  # def show
  #   if user
  #     render json: user, include: ['role']
  #   else
  #     render json: user.errors
  #   end
  # end

  def destroy
    user&.destroy
    render json: { message: 'User deleted!' }
  end

  private

  def user_params
    params.permit(:name, :surname, :email, :role_id, :password, :password_confirmation)
  end
  
  def user
    @user ||= User.includes(:role).find(params[:id])
  end
end
