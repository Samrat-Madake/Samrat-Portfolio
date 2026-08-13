const express = require('express');
const { getSummary, getVisitorTrends, getPages, getRepeatVisitors, getEndpoints } = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/summary', getSummary);
router.get('/visitor-trends', getVisitorTrends);
router.get('/pages', getPages);
router.get('/repeat-visitors', getRepeatVisitors);
router.get('/endpoints', getEndpoints);

module.exports = router;
