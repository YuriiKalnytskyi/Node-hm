const { ErrorHandler, errorMessages } = require('../errors');
const { code } = require('../constants');
const { User } = require('../dataBase');
const { userServices } = require('../services');
const { userCreateValidator, userApdateValidator, idValidator } = require('../validators');

module.exports = {
  checkUserIdValid: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const { error } = await idValidator.validate(req.body);

      const user = await userServices.findUserId({ _id: userId });

      if (error) {
        throw new ErrorHandler(code.DAD_REQUEST, error.details[0].message);
      }
      if (!user) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessages.RECORD_NOT_FOUND.message, errorMessages.RECORD_NOT_FOUND.code);
      }
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
        throw new ErrorHandler(code.NOT_FOUND, error.details[0].message, errorMessages.RECORD_NOT_FOUND.code);
      }

      if (user) {
        throw new ErrorHandler(code.DAD_REQUEST, errorMessages.USER_EMAIL.message, errorMessages.USER_EMAIL.code);
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
        throw new ErrorHandler(code.NOT_FOUND, error.details[0].message, errorMessages.RECORD_NOT_FOUND.code);
      }

      if (!user) {
        throw new ErrorHandler(code.DAD_REQUEST, errorMessages.RECORD_NOT_FOUND.message, errorMessages.RECORD_NOT_FOUND.code);
      }
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

};
