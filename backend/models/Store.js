const pool = require('../config/db');

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS stores (
      id        INT PRIMARY KEY AUTO_INCREMENT,
      name      VARCHAR(100) NOT NULL,
      email     VARCHAR(100),
      address   VARCHAR(400),
      owner_id  INT,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )
  `);
};

const insert         = (s) => pool.query(`INSERT INTO stores(name,email,address,owner_id) VALUES (?,?,?,?)`, [s.name,s.email,s.address,s.owner_id]);
const listStores     = (q) => pool.query(`SELECT * FROM stores ${q}`);
const storeById      = (id)=> pool.query(`SELECT * FROM stores WHERE id=?`, [id]);
const countStores    = ()  => pool.query(`SELECT COUNT(*) AS total FROM stores`);

module.exports = { createTable, insert, listStores, storeById, countStores };
