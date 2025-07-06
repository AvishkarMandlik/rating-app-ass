require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const pool     = require('./config/db');
const User     = require('./models/User');
const Store    = require('./models/Store');
const Rating   = require('./models/Rating');

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await User.createTable();
    await Store.createTable();
    await Rating.createTable();
    console.log('✅ MySQL schema ready');
  } catch (err) {
    console.error('Schema init error:', err);
  }
})();

// ---------- routes ----------
app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/users',   require('./routes/userRoutes'));
app.use('/api/admin',   require('./routes/adminRoutes'));
app.use('/api/stores',  require('./routes/storeRoutes'));
app.use('/api/ratings', require('./routes/ratingRoutes'));

app.get('/', (_req,res)=>res.send('FullStack Rating API running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`🚀 Server on http://localhost:${PORT}`));
