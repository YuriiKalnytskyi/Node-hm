const { User } = require('../dataBase');

module.exports = {
  allUsers: () => User.find({}),
  findUserId: (userId) => User.findOne(userId),
  createUser: (user) => User.create(user),
  deleteUserId: (id) => User.findByIdAndDelete(id),
  updateUserById: (id, newUser) => User.updateOne({ _id: id }, newUser)
};
