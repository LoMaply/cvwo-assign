module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      
      render json: UserSerializer.new(@users).serializable_hash.to_json
    end

    def show
      @user = User.find(params[:id])
      
      render json: UserSerializer.new(@user).serializable_hash.to_json
    end

    def create
      @user = User.new(user_params)

      if @user.save
        render json: UserSerializer.new(@user).serializable_hash.to_json
      else
        render json: { error: user.errors.messages }, status: 422
      end
    end

    def destroy
      @user = User.find(params[:id])
      if @user.destroy
        head :no_content
      else
        render json: { error: user.errors.messages }, status: 422
      end
    end

    private

    def user_params
      params.require(:user).permit(:name)
    end

  end
end