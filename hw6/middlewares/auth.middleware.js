const { ErrorHandler, errorMessages: { NO_TOKEN, WRONG_TOKEN } } = require('../errors');
const { constants: { AUTHORIZATION }, code } = require('../constants');
const { User, OAuth } = require('../dataBase');
const { authHelper } = require('../helpers');

module.exports = {
  getUserByDynamicParam: (paramName, searchIn = 'body', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueOfParams = req[searchIn][paramName];

      const user = await User.findOne({ [dbKey]: valueOfParams });

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

      await authHelper.verifyToken(token, 'refresh');
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
