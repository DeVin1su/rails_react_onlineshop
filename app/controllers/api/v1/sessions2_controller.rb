class Api::V1::Sessions2Controller < ApplicationController
  def create
    @user = User.find_by(login: params[:login])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: @user
    else
      render json: @user.errors
    end
  end

  def get
    @current_user ||= User.find_by_id(session[:user_id]) if !!session[:user_id]

    render json: @current_user
  end

  def destroy
    session.delete(:user_id)
    render json: { message: 'Logout success!' }
  end
end
