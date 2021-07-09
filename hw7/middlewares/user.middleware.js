const { ErrorHandler, errorMessages: { RECORD_NOT_FOUND, USER_EMAIL } } = require('../errors');
const { code } = require('../constants');
const { User } = require('../dataBase');
const { userServices } = require('../services');
const { userCreateValidator, userApdateValidator, idValidator } = require('../validators');

module.exports = {
  checkUserIdValid: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const { error } = await idValidator.id.validate(userId);
      const user = await userServices.findUserId({ _id: userId });

      if (error) {
        throw new ErrorHandler(code.NOT_FOUND, error.details[0].message, RECORD_NOT_FOUND.code);
      }

      if (!user) {
        throw new ErrorHandler(code.NOT_FOUND, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.code);
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsUserEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      const { error } = await userCreateValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.NOT_FOUND, error.details[0].message, RECORD_NOT_FOUND.code);
      }

      if (user) {
        throw new ErrorHandler(code.DAD_REQUEST, USER_EMAIL.message, USER_EMAIL.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findOne({ _id: userId });
      const { error } = await userApdateValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(code.NOT_FOUND, error.details[0].message, RECORD_NOT_FOUND.code);
      }

      if (!user) {
        throw new ErrorHandler(code.DAD_REQUEST, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.code);
      }
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },
};
