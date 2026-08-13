const { Resend } = require('resend');

/**
 * Escape user-controlled text before inserting it into HTML.
 */
const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

/**
 * Send an email notification for a new contact form submission.
 * @param {Object} data - { name, email, subject, message }
 * @returns {Promise<boolean>}
 */
const sendContactNotification = async (data) => {
  const { name, email, subject, message } = data;

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('[email] RESEND_API_KEY is not configured');
      return false;
    }

    if (!process.env.CONTACT_RECEIVER_EMAIL) {
      console.error('[email] CONTACT_RECEIVER_EMAIL is not configured');
      return false;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        
        <h2 style="
          color: #2c3e50;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        ">
          New Portfolio Contact Message
        </h2>

        <p><strong>Name:</strong> ${safeName}</p>

        <p>
          <strong>Email:</strong>
          <a href="mailto:${safeEmail}">
            ${safeEmail}
          </a>
        </p>

        <p><strong>Subject:</strong> ${safeSubject}</p>

        <div style="margin-top: 20px;">
          <p><strong>Message:</strong></p>

          <div style="
            background: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #3498db;
            white-space: pre-wrap;
          ">${safeMessage}</div>
        </div>

        <p style="
          font-size: 12px;
          color: #7f8c8d;
          margin-top: 30px;
        ">
          Submitted: ${new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
          })}
        </p>

      </div>
    `;

    const textContent = `
New Portfolio Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Submitted: ${new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    })}
    `.trim();

    const { data: emailData, error } = await resend.emails.send({
      // Use Resend's testing sender initially.
      // Replace this with your verified domain sender later.
      from: 'Portfolio Contact <onboarding@resend.dev>',

      to: [process.env.CONTACT_RECEIVER_EMAIL],

      // Clicking Reply in Gmail will reply directly to the visitor.
      replyTo: email,

      subject: `Portfolio Contact: ${subject}`,

      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error('[email] Resend failed:', error);
      return false;
    }

    console.log('[email] Notification sent successfully:', emailData?.id);

    return true;
  } catch (error) {
    console.error('[email] Notification failed:', error.message);
    return false;
  }
};

module.exports = { sendContactNotification };