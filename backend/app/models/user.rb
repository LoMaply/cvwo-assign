class User < ApplicationRecord
  has_many :discussions, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :username, presence: true, uniqueness: { case_sensitive: false }
end
