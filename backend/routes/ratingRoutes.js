const { Router } = require('express');
const { body } = require('express-validator');
const ratingCtrl = require('../controllers/ratingController');
const { verifyToken: VerifyToken } = require('../middleware/authMiddleware');

const router = Router();

router.post(
  '/',
  VerifyToken,
  body('store_id').isInt(),
  body('rating').isInt({ min:1, max:5 }),
  ratingCtrl.submitRating
);

module.exports = router;
