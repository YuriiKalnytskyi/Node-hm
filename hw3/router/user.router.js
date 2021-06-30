const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.getAllUser);
router.get('/:userId', userMiddleware.checkIsUser, userController.getUserId);
router.post('/', userMiddleware.userValid, userController.createUser);
router.delete('/:userId', userMiddleware.checkIsUser, userController.deleteUserId);

module.exports = router;
