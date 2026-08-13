const crypto = require('crypto');

const COOKIE_NAME = 'admin_session';

const login = async (req, res, next) => {
  try {
    const { password } = req.body;
    const adminKey = process.env.ADMIN_API_KEY;

    if (!password || !adminKey) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const keyBuf = Buffer.from(password);
    const adminBuf = Buffer.from(adminKey);
    
    if (keyBuf.length !== adminBuf.length || !crypto.timingSafeEqual(keyBuf, adminBuf)) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Set secure cookie
    res.cookie(COOKIE_NAME, adminKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return res.json({ success: true, message: 'Logged in' });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    next(error);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const sessionToken = req.cookies[COOKIE_NAME];
    const adminKey = process.env.ADMIN_API_KEY;
    
    if (!sessionToken || !adminKey || sessionToken !== adminKey) {
      return res.json({ success: true, isAuthenticated: false });
    }
    
    return res.json({ success: true, isAuthenticated: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout, checkAuth, COOKIE_NAME };
