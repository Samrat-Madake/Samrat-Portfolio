const crypto = require('crypto');
const { COOKIE_NAME } = require('../controllers/auth.controller');

const requireAdminKey = (req, res, next) => {
  const sessionToken = req.cookies[COOKIE_NAME];
  const adminKey = process.env.ADMIN_API_KEY;

  if (!sessionToken || !adminKey) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const keyBuf = Buffer.from(sessionToken);
    const adminBuf = Buffer.from(adminKey);
    if (keyBuf.length !== adminBuf.length || !crypto.timingSafeEqual(keyBuf, adminBuf)) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } catch {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  next();
};

module.exports = { requireAdminKey };
