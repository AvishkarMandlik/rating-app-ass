const pool = require('../config/db');

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id        INT PRIMARY KEY AUTO_INCREMENT,
      name      VARCHAR(60)  NOT NULL,
      email     VARCHAR(100) NOT NULL UNIQUE,
      address   VARCHAR(400),
      password  VARCHAR(255) NOT NULL,
      role      ENUM('admin','user','storeOwner') DEFAULT 'user'
    )
  `);
};

const findByEmail      = (email)          => pool.query('SELECT * FROM users WHERE email = ?', [email]);
const findById         = (id)             => pool.query('SELECT * FROM users WHERE id = ?', [id]);
const countByRole      = ()               => pool.query(`SELECT role, COUNT(*) AS total FROM users GROUP BY role`);
const insert           = (u)              =>
  pool.query(`INSERT INTO users(name,email,address,password,role) VALUES (?,?,?,?,?)`, [u.name,u.email,u.address,u.password,u.role]);
const listUsers        = (q)              => pool.query(`SELECT * FROM users ${q}`);
const updatePassword   = (id, hash)       => pool.query(`UPDATE users SET password=? WHERE id=?`, [hash,id]);

module.exports = { createTable, findByEmail, findById, insert, listUsers, countByRole, updatePassword };
