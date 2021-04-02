class Api::V1::SessionsController < Devise::SessionsController
  def create
    @user = User.find_by(email: params[:email])
    return invalid_login_attempt unless @user

    if @user.valid_password?(user_params[:password])
      sign_in :user, @user
      render json: @user
    else
      invalid_login_attempt
    end
  end

  # def get
  #   # if user_signed_in?
  #   #   render json: current_user
  #   # else
  #   #   render json: {error: 'invalid login attempt'}, status: :unprocessable_entity
  #   # end
  #   render json: {error: 'olololol'}, status: :unprocessable_entity
  # end

  def destroy
    # sign_out(@user)
    # render json: { message: 'Logout success!' }
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(@user))
    render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token
    }
  end

  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: 'invalid login attempt'}, status: :unprocessable_entity
  end

  def user_params
    params.permit(:email, :password)
  end
end
