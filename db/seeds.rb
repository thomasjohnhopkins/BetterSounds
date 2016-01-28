User.destroy_all
user1 = User.create!(
  username: "BigCat",
  email: "jimmyf@ad.com",
  password: "password",
  description: "Not Boston, MA"
)

user2 = User.create!(
  username: "TwoSlice",
  email: "jackyb@ad.com",
  password: "password",
  description: "Lower East Side, NY"
)

user3 = User.create!(
  username: "five2fifteen",
  email: "teekle@ad.com",
  password: "password",
  description: "Upper East Side, NY"
)

user4 = User.create!(
  username: "thom",
  email: "thom@ad.com",
  password: "password",
  description: "Greenwich, CT"
)
