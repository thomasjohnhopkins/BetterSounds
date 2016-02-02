class UserFollow < ActiveRecord::Base
  belongs_to :track
  belongs_to :user

  validates :track_id, presence: true
  validates :user_id, presence: true
end
