class Track < ActiveRecord::Base
  # Don't want a default
  has_attached_file :audio
  validates_attachment_content_type :audio,
                                    content_type: /\Aaudio\/.*\Z/

  has_attached_file :image, default_url: "track_default.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  has_many :comments
  has_many :user_follows
  has_many :user_likes
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  validates :title, presence: true
  validates :artist, presence: true
  validates :user_id, presence: true
end
