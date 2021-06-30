const { userService } = require('../service');
// const { errorMessages } = require('../constant');

module.exports = {
  getAllUser: async (req, res) => {
    const users = await userService.allUser();
    res.json(users);
  },

  getUserId: (req, res) => {
    res.json(req.user);
  },

  createUser: (req, res) => {
    userService.createUser(req.body);
    res.json('user create');
  },

  deleteUserId: async (req, res) => {
    const { userId } = req.params;

    await userService.deleteUserId(userId);

    res.json('user delete');
  },
};
