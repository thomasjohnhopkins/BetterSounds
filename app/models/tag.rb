class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  validates :name, length: {
    maximum: 20,
  }

  has_many :taggings, dependent: :destroy
  has_many :tracks, through: :taggings
end
