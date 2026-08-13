const Visitor = require('../models/Visitor.model');
const PageView = require('../models/PageView.model');
const ApiMetric = require('../models/ApiMetric.model');
const Contact = require('../models/Contact.model');

// Timezone for aggregations
const TZ = 'Asia/Kolkata';

// Helper to get date boundaries based on range string
const getDateRange = (rangeStr) => {
  const end = new Date();
  let start = new Date(0); // Default to all time
  let groupBy = 'month'; 

  if (rangeStr === 'today') {
    // Start of today in local timezone
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
    const parts = formatter.formatToParts(end);
    const mo = parts.find(p => p.type === 'month').value;
    const da = parts.find(p => p.type === 'day').value;
    const ye = parts.find(p => p.type === 'year').value;
    start = new Date(`${ye}-${mo}-${da}T00:00:00+05:30`);
    groupBy = 'hour';
  } else if (rangeStr === '1week') {
    start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
    groupBy = 'day';
  } else if (rangeStr === '1month') {
    start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    groupBy = 'day';
  } else if (rangeStr === '6months') {
    start = new Date(end.getTime() - 180 * 24 * 60 * 60 * 1000);
    groupBy = 'month';
  } else if (rangeStr === '1year') {
    start = new Date(end.getTime() - 365 * 24 * 60 * 60 * 1000);
    groupBy = 'month';
  }

  return { start, end, groupBy };
};

const getSummary = async (req, res, next) => {
  try {
    const { start: todayStart } = getDateRange('today');

    const [
      totalVisitors,
      todayVisitors,
      totalPageViews,
      contactSubmissions,
      apiMetrics
    ] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.countDocuments({ lastSeenAt: { $gte: todayStart } }),
      PageView.countDocuments(),
      Contact.countDocuments(),
      ApiMetric.aggregate([
        {
          $group: {
            _id: null,
            totalHits: { $sum: '$count' },
            totalErrors: { $sum: '$errorCount' },
            totalTime: { $sum: '$totalResponseTime' }
          }
        }
      ])
    ]);

    const apiStats = apiMetrics[0] || { totalHits: 0, totalErrors: 0, totalTime: 0 };
    const avgResponseTime = apiStats.totalHits > 0 ? Math.round(apiStats.totalTime / apiStats.totalHits) : 0;
    const errorRate = apiStats.totalHits > 0 ? ((apiStats.totalErrors / apiStats.totalHits) * 100).toFixed(2) : 0;

    return res.json({
      success: true,
      data: {
        totalVisitors,
        todayVisitors,
        totalPageViews,
        contactSubmissions,
        totalApiRequests: apiStats.totalHits,
        avgResponseTime,
        errorRate: Number(errorRate)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getVisitorTrends = async (req, res, next) => {
  try {
    const { range = 'today' } = req.query;
    const { start, groupBy } = getDateRange(range);

    let dateFormat;
    if (groupBy === 'hour') {
      dateFormat = "%Y-%m-%d %H:00";
    } else if (groupBy === 'day') {
      dateFormat = "%Y-%m-%d";
    } else {
      dateFormat = "%Y-%m";
    }

    const trends = await Visitor.aggregate([
      {
        $match: { lastSeenAt: { $gte: start } }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: dateFormat, date: '$lastSeenAt', timezone: TZ }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.json({ success: true, data: trends });
  } catch (error) {
    next(error);
  }
};

const getPages = async (req, res, next) => {
  try {
    const { range = 'today' } = req.query;
    const pipeline = [
      { $group: { _id: '$path', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 15 },
      { $project: { _id: 0, path: '$_id', views: 1 } }
    ];

    if (range !== 'all') {
      const { start } = getDateRange(range);
      pipeline.unshift({ $match: { timestamp: { $gte: start } } });
    }

    const pages = await PageView.aggregate(pipeline);
    return res.json({ success: true, data: pages });
  } catch (error) {
    next(error);
  }
};

const getRepeatVisitors = async (req, res, next) => {
  try {
    const ranges = ['today', '1week', '1month', '6months', '1year'];
    const results = {};

    await Promise.all(ranges.map(async (range) => {
      const { start } = getDateRange(range);
      
      const agg = await Visitor.aggregate([
        { $match: { lastSeenAt: { $gte: start } } },
        {
          $group: {
            _id: null,
            totalUnique: { $sum: 1 },
            repeatVisitors: {
              $sum: { $cond: [{ $gt: ['$visitCount', 1] }, 1, 0] }
            }
          }
        }
      ]);
      
      const data = agg[0] || { totalUnique: 0, repeatVisitors: 0 };
      const percentage = data.totalUnique > 0 ? ((data.repeatVisitors / data.totalUnique) * 100).toFixed(0) : 0;
      
      results[range] = {
        totalUnique: data.totalUnique,
        repeatVisitors: data.repeatVisitors,
        percentage: Number(percentage)
      };
    }));

    return res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

const getEndpoints = async (req, res, next) => {
  try {
    const endpoints = await ApiMetric.aggregate([
      {
        $project: {
          _id: 0,
          method: 1,
          endpoint: 1,
          count: 1,
          successCount: 1,
          errorCount: 1,
          avgResponseTime: {
            $cond: [
              { $gt: ['$count', 0] },
              { $round: [{ $divide: ['$totalResponseTime', '$count'] }, 0] },
              0
            ]
          },
          lastHit: 1
        }
      },
      { $sort: { count: -1 } }
    ]);
    return res.json({ success: true, data: endpoints });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSummary, getVisitorTrends, getPages, getRepeatVisitors, getEndpoints };
