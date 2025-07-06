const { Router } = require('express');
const { body } = require('express-validator');
const auth = require('../controllers/authController');

const router = Router();

router.post(
  '/signup',
  body('name').isLength({ min:20, max:60 }),
  body('address').isLength({ max:400 }),
  body('email').isEmail(),
  body('password').isStrongPassword({ minLength:8, maxLength:16, minUppercase:1, minSymbols:1 }),
  auth.signup
);

router.post('/login', auth.login);

module.exports = router;
