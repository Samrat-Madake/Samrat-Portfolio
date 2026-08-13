const express = require('express');
const { login, logout, checkAuth } = require('../controllers/auth.controller');
const { globalRateLimiter } = require('../middleware/rateLimiter.middleware');

const router = express.Router();

router.post('/login', globalRateLimiter, login);
router.post('/logout', logout);
router.get('/check', checkAuth);

module.exports = router;
