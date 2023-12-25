class DiscussionSerializer
  include JSONAPI::Serializer
  attributes :title, :description, :id, :category

  # Append username of User that created Discussion to request result
  attribute :username do |discussion|
    discussion.user.username
  end

  belongs_to :user
  has_many :comments
end
