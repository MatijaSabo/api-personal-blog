const Resend = require('resend');

const resendApiKey = process.env.RESEND_API_KEY;
const defaultFromEmail = process.env.EMAIL_FROM;

if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(resendApiKey);

class EmailRepository {
    async sendEmail({ to, subject, html, text, from }) {
        const message = {
            from: from || defaultFromEmail || 'no-reply@example.com',
            to,
            subject,
        };

        if (html) {
            message.html = html;
        }

        if (text) {
            message.text = text;
        }

        return await resend.emails.send(message);
    }
}

module.exports = new EmailRepository();