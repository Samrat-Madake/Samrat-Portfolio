require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Required environment variables for the application
const REQUIRED_ENV = [
  'MONGODB_URI',
  'FRONTEND_URL',
];

const missing = REQUIRED_ENV.filter(
  (key) => !process.env[key]
);

if (missing.length) {
  console.error(
    `[server] Missing required environment variables: ${missing.join(', ')}`
  );

  process.exit(1);
}

// Email configuration validation
const EMAIL_ENV = [
  'RESEND_API_KEY',
  'CONTACT_RECEIVER_EMAIL',
];

const missingEmailVars = EMAIL_ENV.filter(
  (key) => !process.env[key]
);

if (missingEmailVars.length) {
  console.warn(
    `[email] Email service is not fully configured. Missing: ${missingEmailVars.join(', ')}`
  );
} else {
  console.log('[email] Resend email service configured');
}

const start = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(
        `[server] running on port ${PORT} in ${process.env.NODE_ENV || 'development'
        } mode`
      );
    });

  } catch (error) {
    console.error(
      '[server] failed to start:',
      error.message
    );

    process.exit(1);
  }
};

start();