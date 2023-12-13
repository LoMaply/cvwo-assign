class ApplicationController < ActionController::API


  SECRET_KEY = "TEST_SECRET_KEY"

  def encode_token(payload)
    JWT.encode(payload, SECRET_KEY)
  end

  def decoded_token
    header = request.headers['Authorization']
    if header
      token = header.split(" ")[1]
      begin
        JWT.decode(token, SECRET_KEY)
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  # Checks authorisation of user based on presence/absence of token
  def authorized
    unless !!current_user
      render json: { message: 'Please log in' }, status: :unauthorized
    end
  end
end
