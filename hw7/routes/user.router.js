const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.get('/', userController.getAllUser);
router.post('/', userMiddleware.checkIsUserEmail, userController.createUser);
router.get('/:userId', userMiddleware.checkUserIdValid, userController.getUserId);
router.delete('/:userId', authMiddleware.checkAccessToken, userMiddleware.checkUserIdValid, userController.deleteUserId);
router.patch('/:userId', authMiddleware.checkAccessToken, userMiddleware.checkUserIdValid,
    userMiddleware.updateUser, userController.updateUserById);

module.exports = router;
