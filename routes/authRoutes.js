const express = require('express');
const { register, login } = require('../controllers/authController');
const validate = require('../middlewares/validate');
const router = express.Router();
const { registerValidation, loginValidation } = require('../validations/authValidation');

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);

module.exports = router;
