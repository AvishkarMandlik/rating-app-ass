const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { newPassword } = req.body;
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(req.user.userId, hash);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listUsers = async (req, res) => {
  const { name = '', email = '', address = '', role = '' } = req.query;
  try {
    const where = `
      WHERE name   LIKE ? AND
            email  LIKE ? AND
            address LIKE ? AND
            role   LIKE ?`;
    const [rows] = await User.listUsers([where, [`%${name}%`, `%${email}%`, `%${address}%`, `%${role}%`]]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.dashboardCounts = async (_req, res) => {
  try {
    const [[{ total: users }]]   = await User.countByRole();
    const [[{ total: stores }]]  = await require('../models/Store').countStores();
    const [[{ total: ratings }]] = await require('../models/Rating').countRatings();
    res.json({ users, stores, ratings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
