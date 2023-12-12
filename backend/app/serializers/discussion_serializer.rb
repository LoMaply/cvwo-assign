class DiscussionSerializer
  include JSONAPI::Serializer
  attributes :title, :description

  belongs_to :user
  has_many :comments
end
