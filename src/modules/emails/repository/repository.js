const Resend = require('resend');

const defaultFromEmail = process.env.EMAIL_FROM;

let resend;

const getClient = () => {
    if (!resend) {
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            throw new Error('Missing RESEND_API_KEY environment variable');
        }

        resend = new Resend(resendApiKey);
    }

    return resend;
};

class EmailRepository {
    async sendEmail({ to, subject, html, text, from }) {
        const resend = getClient();
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