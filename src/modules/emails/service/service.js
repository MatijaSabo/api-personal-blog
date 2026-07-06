const EmailRepository = require('../repository/repository');

class EmailService {
    async sendEmail(data) {
        return await EmailRepository.sendEmail(data);
    }
}

module.exports = new EmailService();