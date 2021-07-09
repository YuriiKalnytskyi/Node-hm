const { code, emailActionsEnum } = require('../constants');
const { passwordHesher } = require('../helpers');
const { userServices, mailServices } = require('../services');

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const users = await userServices.allUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
  getUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userServices.findUserId({ _id: userId });
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { password, email } = req.body;
      const hashedPassword = await passwordHesher.hash(password);
      const createdUser = await userServices.createUser({ ...req.body, password: hashedPassword });

      await mailServices.sendMail(email, emailActionsEnum.WELCOME, { userName: email });

      res.status(code.CREATED).json(createdUser);
    } catch (e) {
      next(e);
    }
  },
  deleteUserId: async (req, res, next) => {
    try {
      const { email } = req.user;
      await userServices.deleteUserId({ _id: req.params.userId });
      await mailServices.sendMail(email, emailActionsEnum.DELETE, { userName: email });

      res.json('deleteUser');
    } catch (e) {
      next(e);
    }
  },
  updateUserById: async (req, res, next) => {
    try {
      const { password, email } = req.body;

      if (password) {
        const hashedPassword = await passwordHesher.hash(password);
        req.body = { ...req.body, password: hashedPassword };
      }
      await userServices.updateUserById(req.params.userId, req.body);
      await mailServices.sendMail(email, emailActionsEnum.UPDATE, { userName: email });

      res.status(code.UPDATED).json('user update');
    } catch (e) {
      next(e);
    }
  }
};
