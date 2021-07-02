const { userServices } = require('../services');
const { passwordHesher } = require('../helpers');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await userServices.findUserId({ email });

      await passwordHesher.compare(password, user.password);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }
};
