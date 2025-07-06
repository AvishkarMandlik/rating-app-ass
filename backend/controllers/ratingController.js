const Rating = require('../models/Rating');
const { validationResult } = require('express-validator');

exports.submitRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { store_id, rating } = req.body;
  try {
    await Rating.submit({ user_id: req.user.userId, store_id, rating });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
