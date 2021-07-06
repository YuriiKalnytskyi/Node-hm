const { passwordHesher, authHelper } = require('../helpers');
const { OAuth } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../errors');
const { constants: { AUTHORIZATION }, code } = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ErrorHandler(code.DAD_REQUEST, errorMessages.EMAIL_PASSWORD.message, errorMessages.EMAIL_PASSWORD.code);
      }
      const { password: hashPassword, _id } = req.user;
      const { password } = req.body;

      await passwordHesher.compare(password, hashPassword);

      const tokenPair = authHelper.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: _id });

      res.json({ ...tokenPair, user: req.user });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await OAuth.remove({ accessToken: token });

      res.status(code.DELETED).json('Success');
      next();
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
      const { _id } = req.user;

      await OAuth.remove({ refreshToken: token });

      const tokenPair = authHelper.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: _id });

      res.json({ ...tokenPair, user: req.user });
    } catch (e) {
      next(e);
    }
  }
};
