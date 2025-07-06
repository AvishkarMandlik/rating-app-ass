const { Router } = require('express');
const { body } = require('express-validator');
const userCtrl = require('../controllers/userController');
const { verifyToken: VerifyToken } = require('../middleware/authMiddleware');

const router = Router();

router.put(
  '/change-password',
  VerifyToken,
  body('newPassword').isStrongPassword({ minLength:8, maxLength:16, minUppercase:1, minSymbols:1 }),
  userCtrl.changePassword
);

module.exports = router;
