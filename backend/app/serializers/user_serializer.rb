class UserSerializer
  include JSONAPI::Serializer
  attributes :name

  has_many :discussions
  has_many :comments
end
