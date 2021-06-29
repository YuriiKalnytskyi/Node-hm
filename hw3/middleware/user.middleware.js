const { userService } = require('../service');
const { errorMessages } = require('../constant');

module.exports = {
  checkIsUser: (req, res, next) => {
    const { userId } = req.params;

    const userById = userService.getUserId(userId);

    if (!userById) {
      throw new Error(errorMessages.NOT_FOUND);
    }

    req.user = userById;

    next();
  },

  userValid: (req, res, next) => {
    const { name } = req.body;
    const allUser = userService.allUser();
    const find = allUser.find((value) => value.name === name);

    if (!find) {
      throw new Error(errorMessages.NOT_FOUND);
    }

    next();
  }

};
