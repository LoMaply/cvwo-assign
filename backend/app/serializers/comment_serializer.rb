class CommentSerializer
  include JSONAPI::Serializer
  attributes :description, :id, :created_at, :updated_at

  # Append username of User that created comment to request result
  attribute :username do |comment|
    comment.user.username
  end

  belongs_to :user
  belongs_to :discussion
end
