const bcrypt = require('bcrypt');
const { ErrorHandler, errorMessages } = require('../errors');
const { code } = require('../constants');

module.exports = {
  compare: async (hashPassword, password) => {
    const isPasswordMatchet = await bcrypt.compare(hashPassword, password);

    if (!isPasswordMatchet) {
      throw new ErrorHandler(code.DAD_REQUEST, errorMessages.USER_EMAIL_PASSWORD.message, errorMessages.USER_EMAIL_PASSWORD.code);
    }
  },
  hash: (password) => bcrypt.hash(password, 10)
};
