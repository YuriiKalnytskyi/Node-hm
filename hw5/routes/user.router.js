const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUser);
router.get('/:userId', userMiddleware.checkIsUser, userController.getUserId);
router.post('/', userMiddleware.checkIsUserEmail, userController.createUser);
router.delete('/:userId', userMiddleware.checkIsUser, userController.deleteUserId);
router.patch('/:userId', userMiddleware.updateUser, userController.updateUserById);

module.exports = router;
