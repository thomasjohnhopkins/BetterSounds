class Track < ActiveRecord::Base

  belongs_to :user

  validates :title, presence: true
  validates :artist, presence: true
  validates :user_id, presence: true
  validates :sound_url, presence: true
end
