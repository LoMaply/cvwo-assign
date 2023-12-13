class UserSerializer
  include JSONAPI::Serializer
  attributes :username

  has_many :discussions
  has_many :comments
end
