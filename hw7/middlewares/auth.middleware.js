const { ErrorHandler, errorMessages, errorMessages: { NO_TOKEN, WRONG_TOKEN } } = require('../errors');
const { constants: { AUTHORIZATION, REFRESH }, code } = require('../constants');
const { User, OAuth } = require('../dataBase');
const { authHelper } = require('../helpers');
const { userServices } = require('../services');

module.exports = {
  getUserByDynamicParam: (paramName, searchIn = 'body', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueOfParams = req[searchIn][paramName];

      const user = await User.findOne({ [dbKey]: valueOfParams });

      if (!user) {
        throw new ErrorHandler(code.DAD_REQUEST, errorMessages.EMAIL_PASSWORD.message, errorMessages.EMAIL_PASSWORD.code);
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(code.UNAUTHORIZED, NO_TOKEN.message, NO_TOKEN.code);
      }

      await authHelper.verifyToken(token);
      const tokenObject = await OAuth.findOne({ accessToken: token });

      const user = userServices.findUserId({ _id: tokenObject.user });

      if (!user) {
        throw new ErrorHandler(code.DAD_REQUEST, errorMessages.EMAIL_PASSWORD.message, errorMessages.EMAIL_PASSWORD.code);
      }

      if (!tokenObject) {
        throw new ErrorHandler(code.UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
      }

      req.user = tokenObject.user;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(code.UNAUTHORIZED, NO_TOKEN.message, NO_TOKEN.code);
      }

      await authHelper.verifyToken(token, REFRESH);
      const tokenObject = await OAuth.findOne({ refreshToken: token });

      if (!tokenObject) {
        throw new ErrorHandler(code.UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
      }
      req.user = tokenObject.user;
      next();
    } catch (e) {
      next(e);
    }
  }

};
