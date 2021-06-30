const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUser);
router.get('/:userId', userMiddleware.checkIsUser, userController.getUserId);
router.post('/', userController.createUser);
router.delete('/:userId', userController.deleteUserId);
// router.patch('/:userId', userController.updateUserById);

module.exports = router;
