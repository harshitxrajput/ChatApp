const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/register',
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({min: 3 }).withMessage("Password must be at least 3 characters long"),
    userController.createUserController);

router.post('/login',
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({ min: 3 }).withMessage("Password must be at least 3 characters long"),
    userController.loginUserController
)

router.get('/profile', authUser, userController.profileController);

router.get('/logout', authUser, userController.logoutController);

module.exports = router;