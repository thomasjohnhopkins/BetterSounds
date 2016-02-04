class Tagging < ActiveRecord::Base
  validates :tag, presence: true
  validates :track, presence: true

  belongs_to :tag
  belongs_to :track
end
