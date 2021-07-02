const router = require('express').Router();

const { authController } = require('../controllers');
const { tor } = require('../middlewares');

router.post('/', tor, authController.login);

module.exports = router;
