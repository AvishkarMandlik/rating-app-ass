const { Router } = require('express');
const { body } = require('express-validator');
const userCtrl  = require('../controllers/userController');
const storeCtrl = require('../controllers/storeController');
const { verifyToken: VerifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');  // ✅ FIXED

const router = Router();

router.get('/dashboard', VerifyToken, checkRole('admin'), userCtrl.dashboardCounts);
router.get('/users', VerifyToken, checkRole('admin'), userCtrl.listUsers);

router.post(
  '/stores',
  VerifyToken, checkRole('admin'),
  body('name').notEmpty(),
  storeCtrl.addStore
);

module.exports = router;
