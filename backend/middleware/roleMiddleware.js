// 📁 middleware/roleMiddleware.js

// Generic middleware to allow multiple roles
const checkRole = (...allowed) => (req, res, next) => {
  if (!req.user || !allowed.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only.' });
  }
  next();
};

const isStoreOwner = (req, res, next) => {
  if (req.user.role !== 'storeOwner') {
    return res.status(403).json({ message: 'Only store owners can access this.' });
  }
  next();
};

module.exports = {
  checkRole,
  isAdmin,
  isStoreOwner
};
