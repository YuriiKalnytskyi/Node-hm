const { userService } = require('../service');
// const { errorMessages } = require('../constant');

module.exports = {
  getAllUser: (req, res) => {
    const users = userService.allUser();
    res.json(users);
  },

  getUserId: (req, res) => {
    res.json(req.user);
  },

  createUser: (req, res) => {
    userService.createUser(req.body);
    res.json('user create');
  },

};
