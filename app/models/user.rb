class User < ActiveRecord::Base
  attr_reader :password

  has_many :tracks
  has_many :comments
  has_many :user_follows

  has_attached_file :image, default_url: "hbo_concert.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :session_token, presence: true

  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)

    return user if user

    if provider == "facebook"
      User.create(
        provider: provider,
        uid: uid,
        username: auth_hash[:info][:name],
        email: auth_hash[:info][:email],
        description: "Earth",
        website: "Edit me using option in navigation bar.",
        bio: "Edit me using option in navigation bar.",
        password: SecureRandom::urlsafe_base64
      )
    end

    if provider == "twitter"
      User.create(
        provider: provider,
        uid: uid,
        username: auth_hash[:info][:nickname],
        email: auth_hash[:info][:nickname] + "@twitter.com",
        description: "Earth",
        website: "Edit me using option in navigation bar.",
        bio: "Edit me using option in navigation bar. Note that your email has been generated using your twitter user name. Please feel free to edit it, as you may use it to log back in later.",
        password: SecureRandom::urlsafe_base64
      )
    end

  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
