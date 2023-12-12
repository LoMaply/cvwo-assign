class DiscussionSerializer
  include JSONAPI::Serializer
  attributes :title, :description, :id

  belongs_to :user
  has_many :comments
end
