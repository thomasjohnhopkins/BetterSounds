class Track < ActiveRecord::Base
  # Don't want a default
  has_attached_file :audio
  validates_attachment_content_type :audio, :content_type => /.*/

  belongs_to :user

  validates :title, presence: true
  validates :artist, presence: true
  validates :user_id, presence: true
end
