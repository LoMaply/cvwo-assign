class AuthenticationController < ApplicationController
  def login
    user = User.find_by(username: params[:username])

    if user
      token = encode_token(user_id: user.id)
      render json: { token: token, user: user }
    else
      render json: { error: 'Invalid username' }, status: :unauthorized
    end
  end

  
end
