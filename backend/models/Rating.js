const pool = require('../config/db');

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ratings (
      id        INT PRIMARY KEY AUTO_INCREMENT,
      user_id   INT,
      store_id  INT,
      rating    INT CHECK (rating BETWEEN 1 AND 5),
      UNIQUE KEY uniq (user_id, store_id),
      FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
      FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
    )
  `);
};

const submit        = (r) => pool.query(`INSERT INTO ratings(user_id,store_id,rating) VALUES (?,?,?) ON DUPLICATE KEY UPDATE rating=?`, [r.user_id,r.store_id,r.rating,r.rating]);
const avgForStore   = (sid)=> pool.query(`SELECT AVG(rating) AS avgRating FROM ratings WHERE store_id=?`, [sid]);
const listByStore   = (sid)=> pool.query(`
    SELECT u.id, u.name, u.email, r.rating
    FROM ratings r JOIN users u ON u.id = r.user_id
    WHERE r.store_id=?`, [sid]);
const listByUser    = (uid)=> pool.query(`SELECT * FROM ratings WHERE user_id=?`, [uid]);
const countRatings  = ()   => pool.query(`SELECT COUNT(*) AS total FROM ratings`);

module.exports = { createTable, submit, avgForStore, listByStore, listByUser, countRatings };
