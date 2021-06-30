// const { errorMessages } = require('../constant');
const { User } = require('../dataBase');
const { code } = require('../constants');

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  getUserId: (req, res) => {
    res.json(req.user);
  },

  createUser: async (req, res, next) => {
    try {
      const createdUser = await User.create(req.body);

      res.status(code.CREATED).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  deleteUserId: async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.userId);

      res.status(200).json(code.DELETED);
    } catch (e) {
      next(e);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await User.findByIdAndUpdate(userId, req.body);

      res.status(code.UPDATED).json(`user update ${userId}`);
    } catch (e) {
      next(e);
    }
  }
};
