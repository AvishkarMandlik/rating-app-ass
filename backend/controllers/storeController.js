const { Store, Rating, User } = require('../models/Store');
const { validationResult } = require('express-validator');

exports.addStore = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { name, email, address, owner_id } = req.body;
  try {
    await Store.create({ name, email, address, ownerId: owner_id }); // Sequelize-style
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// 📌 List all stores with optional search, sorting, and user context
// ─────────────────────────────────────────────────────────────
exports.listStores = async (req, res) => {
  const { name = '', address = '', sort = 'name', dir = 'ASC' } = req.query;
  try {
    const stores = await Store.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
        address: { [Op.like]: `%${address}%` }
      },
      order: [[sort, dir.toUpperCase()]],
    });

    const enrichedStores = await Promise.all(stores.map(async (store) => {
      const ratings = await Rating.findAll({ where: { storeId: store.id } });

      const avgRating = ratings.length
        ? (ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length).toFixed(1)
        : null;

      let myRating = null;
      if (req.user) {
        const userRating = await Rating.findOne({
          where: {
            storeId: store.id,
            userId: req.user.id
          }
        });
        myRating = userRating?.score || null;
      }

      return {
        ...store.toJSON(),
        avgRating,
        myRating
      };
    }));

    res.status(200).json(enrichedStores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// 📌 Store Owner's dashboard: basic info and average
// ─────────────────────────────────────────────────────────────
exports.ownerDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { ownerId: req.user.id } });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const ratings = await Rating.findAll({ where: { storeId: store.id } });

    const avgRating = ratings.length
      ? (ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length).toFixed(1)
      : null;

    res.status(200).json({ store, avgRating, raters: ratings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// 📌 Store Owner's ratings page with user info
// ─────────────────────────────────────────────────────────────
exports.getStoreRatingsForOwner = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { ownerId: req.user.id } });

    if (!store) return res.status(404).json({ message: "Store not found." });

    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    const average = ratings.length
      ? (ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length).toFixed(1)
      : null;

    res.status(200).json({ store, ratings, average });
  } catch (err) {
    console.error("Error getting store ratings:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

