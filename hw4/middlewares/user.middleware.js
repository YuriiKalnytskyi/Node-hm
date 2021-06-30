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

  // userValid: async (req, res, next) => {
  //   try {
  //     const { name } = req.body;
  //     const allUser = await userService.allUser();
  //
  //     allUser.forEach((value) => {
  //       if (value.name === name) {
  //         throw new Error(errorMessages.NOT_FOUND);
  //       }
  //     });
  //
  //     next();
  //   } catch (e) {
  //     res.json(e.message);
  //   }
  // }

};
