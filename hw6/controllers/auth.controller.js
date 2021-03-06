const { passwordHesher, authHelper } = require('../helpers');
const { OAuth } = require('../dataBase');
const { constants: { AUTHORIZATION }, code } = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
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

      // eslint-disable-next-line no-unused-expressions
      res.status(code.DELETED).json('Success').end;
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
