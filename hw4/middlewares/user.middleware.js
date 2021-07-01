const { ErrorHandler, errorMessages } = require('../errors');
const { code } = require('../constants');
const { User } = require('../dataBase');

module.exports = {
  checkIsUser: (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = User.findById(userId);

      if (!userById) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessages.RECORD_NOT_FOUND.message, errorMessages.RECORD_NOT_FOUND.code);
      }

      req.user = userById;

      next();
    } catch (err) {
      next(err);
    }
  },

  userValid: async (req, res, next) => {
    try {
      const { email } = req.body;
      const allUser = await User.find({});
      const findEmail = allUser.find((value) => value.email === email);

      if (findEmail) {
        throw new ErrorHandler(400, errorMessages.USER_EMAIL.message, errorMessages.USER_EMAIL.code);
      }

      next();
    } catch (e) {
      res.json(e.message);
    }
  }

};
