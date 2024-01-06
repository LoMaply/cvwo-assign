module Api
  class DiscussionsController < ApplicationController
    before_action :authorized, only: [:create, :update, :destroy]

    def index
      if params[:query].present?
        @discussions = Discussion.where("title LIKE ?", "%" + Discussion.sanitize_sql_like(params[:query]) + "%")
      else
        @discussions= Discussion.all
      end
      
      render json: DiscussionSerializer.new(@discussions).serializable_hash.to_json
    end

    def show
      @discussion = Discussion.find(params[:id])

      render json: DiscussionSerializer.new(@discussion, options).serializable_hash.to_json
    end

    def create
      @discussion = Discussion.new(discussion_params)

      if @discussion.save
        render json: DiscussionSerializer.new(@discussion).serializable_hash.to_json
      else
        render json: { error: discussion.errors.messages }, status: 422
      end
    end

    def update
      @discussion = Discussion.find(params[:id])

      if @discussion.update(discussion_params)
        render json: DiscussionSerializer.new(@discussion, options).serializable_hash.to_json
      else
        render json: { error: discussion.errors.messages }, status: 422
      end
    end

    def destroy
      @discussion = Discussion.find(params[:id])

      if @discussion.destroy
        head :no_content
      else
        render json: { error: discussion.errors.messages }, status: 422
      end
    end


    private

    def discussion_params
      params.require(:discussion).permit(:title, :description, :user_id, :category)
    end

    def options
      @options ||= { include: %i[comments] }
    end
  end
end
