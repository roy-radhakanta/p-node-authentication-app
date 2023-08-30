const express = require('express');
const router = express.Router();

const usersController = require("../controller/user_controller");
router.get('/profile', usersController.profile);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);
router.post('/create', usersController.create);


module.exports = router;