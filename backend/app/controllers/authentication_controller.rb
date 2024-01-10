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

  def load
    token = params[:token]
    decoded = JWT.decode(token, SECRET_KEY, nil)

    if decoded
      user_id = decoded[0]['user_id']
      @user = User.find_by(id: user_id)
      render json: { token: token, user: @user }
    else 
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
end
