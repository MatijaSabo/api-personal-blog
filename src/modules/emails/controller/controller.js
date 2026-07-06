const EmailService = require('../service/service');

class EmailController {
    async sendEmail(req, res) {
        const { to, subject, html, text, from } = req.body;

        if (!to || !subject || (!html && !text)) {
            return res.status(400).json({
                error: 'Missing required fields: to, subject, and html or text',
            });
        }

        try {
            const result = await EmailService.sendEmail({
                to,
                subject,
                html,
                text,
                from,
            });

            res.json(result);
        } catch (error) {
            console.error('Email send error:', error);
            res.status(500).json({
                error: 'Email send failed',
                message: error.message || error,
            });
        }
    }
}

module.exports = new EmailController();