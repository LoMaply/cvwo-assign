class CommentSerializer
  include JSONAPI::Serializer
  attributes :description

  belongs_to :user
  belongs_to :discussion
end
