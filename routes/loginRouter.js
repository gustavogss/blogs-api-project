const express = require('express');

const validatedLogin = require('../middlewares/loginValidated');
const { loginUser } = require('../controllers/loginController');

const router = express.Router();

router.post('/', validatedLogin, loginUser);

module.exports = router;