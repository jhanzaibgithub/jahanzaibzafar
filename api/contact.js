import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // Parse body if required
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // failed parse
      }
    }

    const { name, email, subject, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Message).',
      });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER || 'jahanzaibryk2020@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'zaep hige jeal cdym';
    const smtpTo = process.env.SMTP_TO || 'jahanzaibryk2020@gmail.com';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const inquirySubject = subject 
      ? `📌 [PORTFOLIO INQUIRY] ${subject}` 
      : `📌 [PORTFOLIO INQUIRY] New Message from ${name}`;
      
    const dateFormatted = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // High quality editorial HTML Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${inquirySubject}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2e2b28;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e5dfd7;">
                
                <!-- Header -->
                <tr>
                  <td style="background-color: #2B4141; padding: 32px; text-align: left; background-image: linear-gradient(135deg, #2B4141 0%, #1a2929 100%);">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="display: inline-block; background-color: #C2603E; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 12px; border-radius: 20px;">
                        🚨 IMPORTANT — PORTFOLIO MESSAGE
                      </span>
                    </div>
                    <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700; line-height: 1.3;">
                      ${inquirySubject}
                    </h1>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 32px;">
                    
                    <!-- Metadata Grid -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #faf7f2; border-radius: 8px; border: 1px solid #eee8df; padding: 16px;">
                      <tr>
                        <td style="padding: 8px 12px; font-size: 13px; color: #7a736c; font-weight: 600; width: 90px; vertical-align: top;">From:</td>
                        <td style="padding: 8px 12px; font-size: 15px; color: #0d0d0d; font-weight: 700;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 12px; font-size: 13px; color: #7a736c; font-weight: 600; vertical-align: top;">Email:</td>
                        <td style="padding: 8px 12px; font-size: 15px; color: #C2603E; font-weight: 600;">
                          <a href="mailto:${email}" style="color: #C2603E; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      ${
                        subject
                          ? `
                      <tr>
                        <td style="padding: 8px 12px; font-size: 13px; color: #7a736c; font-weight: 600; vertical-align: top;">Subject:</td>
                        <td style="padding: 8px 12px; font-size: 15px; color: #2B4141; font-weight: 600;">${subject}</td>
                      </tr>
                      `
                          : ''
                      }
                      <tr>
                        <td style="padding: 8px 12px; font-size: 13px; color: #7a736c; font-weight: 600; vertical-align: top;">Date:</td>
                        <td style="padding: 8px 12px; font-size: 13px; color: #55504a;">${dateFormatted}</td>
                      </tr>
                    </table>

                    <!-- Message Label -->
                    <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #2B4141; margin: 0 0 12px 0;">Message Content</h3>

                    <!-- Message Box -->
                    <div style="background-color: #ffffff; border-left: 4px solid #C2603E; padding: 20px; border-radius: 4px; border: 1px solid #e5dfd7; border-left-width: 4px; font-size: 15px; line-height: 1.7; color: #2e2b28; white-space: pre-wrap;">
${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                    </div>

                    <!-- Action Button -->
                    <div style="margin-top: 32px; text-align: center;">
                      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(inquirySubject)}" style="display: inline-block; background-color: #C2603E; color: #ffffff; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; box-shadow: 0 4px 12px rgba(194, 96, 62, 0.3);">
                        Reply Direct to ${name} &rarr;
                      </a>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #faf7f2; padding: 20px 32px; text-align: center; border-top: 1px solid #eee8df; font-size: 12px; color: #8c857b;">
                    Sent automatically via <strong style="color: #2B4141;">Jahanzaib Zafar Portfolio Contact Form</strong>.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const textContent = `📌 [PORTFOLIO INQUIRY]\n\nFrom: ${name} (${email})\nSubject: ${subject || 'N/A'}\nDate: ${dateFormatted}\n\nMessage:\n${message}`;

    await transporter.sendMail({
      from: `"📌 PORTFOLIO INQUIRY" <${smtpUser}>`,
      to: smtpTo,
      replyTo: `"${name}" <${email}>`,
      subject: inquirySubject,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '1 (Highest)',
        'X-MSMail-Priority': 'High',
        'Importance': 'High',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
    });
  } catch (err) {
    console.error('SMTP Send Mail Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message via SMTP. Please try again or reach out directly via email.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
}
