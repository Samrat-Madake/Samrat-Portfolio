const UAParser = require('ua-parser-js');
const Visitor = require('../models/Visitor.model');
const PageView = require('../models/PageView.model');

const trackVisitor = async (req, res, next) => {
  try {
    const { path, visitorId, sessionId, referrer } = req.body;

    if (!path || !visitorId || !sessionId) {
      return res.status(400).json({ success: false, message: 'path, visitorId, and sessionId are required' });
    }

    const parser = new UAParser(req.headers['user-agent']);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    // 1. Log the page view
    await PageView.create({
      visitorId,
      sessionId,
      path,
      referrer,
    });

    // 2. Upsert the visitor
    const existing = await Visitor.findOne({ visitorId });

    if (!existing) {
      await Visitor.create({
        visitorId,
        sessionId,
        browser: { name: browser.name, version: browser.version },
        os: { name: os.name, version: os.version },
        device: device.type || 'desktop',
        visitCount: 1,
      });
      return res.json({ success: true });
    }

    const update = {
      lastSeenAt: new Date(),
    };

    if (existing.sessionId !== sessionId) {
      update.$inc = { visitCount: 1 };
      update.sessionId = sessionId; // Update to the new session
    }

    await Visitor.findOneAndUpdate({ visitorId }, update);
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const heartbeat = async (req, res, next) => {
  try {
    const { visitorId } = req.body;
    if (!visitorId) return res.status(400).json({ success: false, message: 'visitorId required' });
    
    await Visitor.findOneAndUpdate({ visitorId }, { lastSeenAt: new Date() });
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getVisitors = async (req, res, next) => {
  try {
    const visitors = await Visitor.find().sort({ firstVisitAt: -1 }).lean();
    return res.json({ success: true, total: visitors.length, data: visitors });
  } catch (error) {
    next(error);
  }
};

module.exports = { trackVisitor, heartbeat, getVisitors };
