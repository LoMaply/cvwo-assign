class User < ApplicationRecord
  has_many :discussions
  has_many :comments

  validates :username, presence: true, uniqueness: true
end
