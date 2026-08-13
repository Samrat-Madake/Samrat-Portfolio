const ApiMetric = require('../models/ApiMetric.model');

const normalizeEndpoint = (path) => {
  // Simple normalization: replace ObjectId-like or number segments with :id
  if (!path) return '/';
  
  // Basic normalization for common paths
  return path.replace(/\/[a-fA-F0-9]{24}(\/|$)/g, '/:id$1')
             .replace(/\/\d+(\/|$)/g, '/:id$1');
};

const excludePaths = ['/api/v1/health', '/api/v1/analytics'];

const analyticsMiddleware = (req, res, next) => {
  // Skip analytics routes themselves to prevent recursive infinite stats
  // and skip health checks
  if (excludePaths.some(p => req.path.startsWith(p))) {
    return next();
  }

  const start = Date.now();
  const originalEnd = res.end;

  res.end = function (...args) {
    const responseTime = Date.now() - start;
    const statusCode = res.statusCode;
    const isError = statusCode >= 400;

    // Call the original res.end()
    originalEnd.apply(res, args);

    // Save metric asynchronously
    const endpoint = normalizeEndpoint(req.baseUrl + req.path);
    
    // Fire and forget
    ApiMetric.findOneAndUpdate(
      { method: req.method, endpoint },
      [
        {
          $set: {
            count: { $add: [{ $ifNull: ['$count', 0] }, 1] },
            successCount: { $add: [{ $ifNull: ['$successCount', 0] }, isError ? 0 : 1] },
            errorCount: { $add: [{ $ifNull: ['$errorCount', 0] }, isError ? 1 : 0] },
            totalResponseTime: { $add: [{ $ifNull: ['$totalResponseTime', 0] }, responseTime] },
            lastHit: new Date(),
          }
        },
        {
          $set: {
            avgResponseTime: {
              $cond: [
                { $gt: ['$count', 0] },
                { $round: [{ $divide: ['$totalResponseTime', '$count'] }, 0] },
                0
              ]
            }
          }
        }
      ],
      { upsert: true, new: false } // return old to save DB work
    ).then(() => {
      // Background update successful
    }).catch(err => {
      // Don't crash on analytics failure
      console.error('[analytics] Failed to save api metric:', err.message);
    });
  };

  next();
};

module.exports = { analyticsMiddleware };
