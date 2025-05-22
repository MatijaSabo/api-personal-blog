const FeedbackRepository = require(`../repository/repository`);

class FeedbackService {

    async findAll() {
        return await FeedbackRepository.findAll();
    }

    async findByID(id) {
        const data = await FeedbackRepository.findByID(id);

        if (data) {
            return data.Item;
        }

        return data;
    }

    async create(data) {
        return await FeedbackRepository.create({
            message: data.message
        });
    }

    async update(id, data) {
        return await FeedbackRepository.update(id, {
            message: data.message
        });
    }

    async deleteByID(id) {
        return await FeedbackRepository.deleteByID(id);
    }

}

module.exports = new FeedbackService()