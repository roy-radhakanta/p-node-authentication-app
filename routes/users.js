const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require("../controller/user_controller");
router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
   {failureRedirect: '/users/signin'}
   ), usersController.createSession);

router.get('/signout', usersController.destroysession);

module.exports = router;