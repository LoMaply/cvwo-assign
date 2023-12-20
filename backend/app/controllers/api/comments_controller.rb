module Api
  class CommentsController < ApplicationController
    before_action :authorized
    
    def create
      @comment = Comment.new(comment_params)

      if @comment.save
        render json: CommentSerializer.new(@comment).serializable_hash.to_json
      else
        render json: { error: comment.errors.messages }, status: 422
      end
    end

    def update
      @comment = Comment.find(params[:id])

      if @comment.update(comment_params)
        render json: CommentSerializer.new(@comment).serializable_hash.to_json
      else
        render json: { error: comment.errors.messages }, status: 422
      end
    end

    def destroy
      @comment = Comment.find(params[:id])

      if @comment.destroy
        head :no_content
      else
        render json: { error: comment.errors.messages }, status: 422
      end
    end
    
    private

    def comment_params
      params.require(:comment).permit(:description, :user_id, :discussion_id)
    end
  end
end