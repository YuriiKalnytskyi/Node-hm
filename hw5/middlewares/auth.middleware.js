const { autsValidator } = require('../validators');
const { ErrorHandler, errorMessages } = require('../errors');
const { userServices } = require('../services');
const { code } = require('../constants');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userServices.findUserId({ email });
    const { error } = await autsValidator.validate(req.body);

    if (error) {
      throw new ErrorHandler(code.NOT_FOUND, error.details[0].message, errorMessages.RECORD_NOT_FOUND.code);
    }
    if (!user) {
        throw new ErrorHandler(code.NOT_FOUND, errorMessages.RECORD_NOT_FOUND.message, errorMessages.RECORD_NOT_FOUND.code);
    }
    next();
  } catch (e) {
    next(e);
  }
};
