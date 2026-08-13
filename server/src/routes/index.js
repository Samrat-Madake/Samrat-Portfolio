const express = require('express');
const contactRoutes = require('./contact.routes');
const visitorRoutes = require('./visitor.routes');
const authRoutes = require('./auth.routes');
const analyticsRoutes = require('./analytics.routes');
const { globalRateLimiter } = require('../middleware/rateLimiter.middleware');
const { analyticsMiddleware } = require('../middleware/analytics.middleware');

const router = express.Router();

router.use(globalRateLimiter);
router.use(analyticsMiddleware); // Apply global analytics tracking

router.get('/health', (req, res) =>
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  }),
);

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/visitors', visitorRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
