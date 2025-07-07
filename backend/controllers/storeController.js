const { validationResult } = require("express-validator");
const Store   = require("../models/Store");
const Rating  = require("../models/Rating");
const pool    = require("../config/db");


exports.addStore = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { name, email, address, owner_id } = req.body;
  try {
    await Store.insert({ name, email, address, owner_id });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("❌ Store insert failed:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.listStores = async (req, res) => {
  const { name = "", address = "", sort = "name", dir = "ASC" } = req.query;

  const allowedSorts = ["name", "email", "address", "id"];
  const allowedDirs = ["ASC", "DESC"];

  const sortField = allowedSorts.includes(sort) ? sort : "name";
  const sortDir = allowedDirs.includes(dir.toUpperCase()) ? dir.toUpperCase() : "ASC";

  const whereClause = `WHERE name LIKE ? AND address LIKE ?`;
  const params = [`%${name}%`, `%${address}%`];

  const finalQuery = `${whereClause} ORDER BY ${sortField} ${sortDir}`;

  try {
    const [stores] = await Store.listStores(finalQuery, params);

    const enriched = await Promise.all(
      stores.map(async (s) => {
        const [[avg]] = await Rating.avgForStore(s.id);
        const [[mine]] = req.user
          ? await Rating.listByStore(req.user.userId, s.id)
          : [[]];

        return {
          ...s,
          avgRating: Number(avg?.avgRating || 0).toFixed(1),
          myRating: mine?.rating || null,
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error("❌ listStores failed:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.ownerDashboard = async (req, res) => {
  try {
    const [[store]] = await Store.listStores("WHERE owner_id = ?", [req.user.userId]);
    if (!store) return res.status(404).json({ error: "Store not found" });

    const [[avg]] = await Rating.avgForStore(store.id);
    const [raters] = await Rating.listByStore(store.id);

    res.json({
      store,
      avgRating: Number(avg?.avgRating || 0).toFixed(1),
      raters,
    });
  } catch (err) {
    console.error("❌ ownerDashboard failed:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getStoreRatingsForOwner = exports.ownerDashboard;
