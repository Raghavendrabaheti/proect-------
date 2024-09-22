const express =require('express');

const UserControllers = require('../Controller/UserController.js');

const router = express.Router();

router.post('/register',UserControllers.signUp);
router.post('/login',UserControllers.login);

module.exports = router;