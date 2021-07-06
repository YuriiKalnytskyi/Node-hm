const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUser);
router.post('/', userMiddleware.checkIsUserEmail, userController.createUser);
router.get('/:userId', userMiddleware.checkUserIdValid, userController.getUserId);
router.delete('/:userId', userMiddleware.checkUserIdValid, userController.deleteUserId);
router.patch('/:userId', userMiddleware.checkUserIdValid, userMiddleware.updateUser, userController.updateUserById);

module.exports = router;
