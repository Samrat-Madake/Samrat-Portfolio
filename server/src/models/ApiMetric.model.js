const mongoose = require('mongoose');

const apiMetricSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
      index: true,
    },
    endpoint: {
      type: String,
      required: true,
      index: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    successCount: {
      type: Number,
      default: 0,
    },
    errorCount: {
      type: Number,
      default: 0,
    },
    totalResponseTime: {
      type: Number,
      default: 0,
    },
    avgResponseTime: {
      type: Number,
      default: 0,
    },
    lastHit: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Compound index to quickly find an endpoint metric
apiMetricSchema.index({ method: 1, endpoint: 1 }, { unique: true });

module.exports = mongoose.model('ApiMetric', apiMetricSchema);
