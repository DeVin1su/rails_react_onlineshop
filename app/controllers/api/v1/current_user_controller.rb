class Api::V1::CurrentUserController < ApplicationController
  def index
    render json: current_user
    # if user_signed_in?
    #   render json: current_user
    # else
    #   render json: {error: 'olololol'}, status: :unprocessable_entity
    # end
  end
end
