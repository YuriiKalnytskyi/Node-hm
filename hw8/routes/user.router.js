const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware, fileMiddleware } = require('../middlewares');

router.get('/', userController.getAllUser);
router.post('/', fileMiddleware.checkFiles, userMiddleware.checkIsUserEmail, userController.createUser);
router.get('/:userId', userMiddleware.checkUserIdValid, userController.getUserId);
router.delete('/:userId', authMiddleware.checkAccessToken, userMiddleware.checkUserIdValid, userController.deleteUserId);
router.patch('/:userId', authMiddleware.checkAccessToken, userMiddleware.checkUserIdValid,
    userMiddleware.updateUser, userController.updateUserById);

router.post('/:userId/avatar',
    userMiddleware.checkUserIdValid,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userController.addAvatar);

router.post('/:userId/photos',
    userMiddleware.checkUserIdValid,
    fileMiddleware.checkFiles,
    userController.addGallery);
module.exports = router;
