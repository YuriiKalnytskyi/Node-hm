const { userService } = require('../service');
const { errorMessages } = require('../constant');

module.exports = {
  checkIsUser: (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = userService.getUserId(userId);

      if (!userById) {
        throw new Error(errorMessages.NOT_FOUND);
      }

      req.user = userById;

      next();
    } catch (e) {
      res.json(e.message);
    }
  },

  userValid: async (req, res, next) => {
    try {
      const { name } = req.body;
      const allUser = await userService.allUser();

      allUser.forEach((value) => {
        if (value.name === name) {
          throw new Error(errorMessages.NOT_FOUND);
        }
      });

      next();
    } catch (e) {
      res.json(e.message);
    }
  }

};
