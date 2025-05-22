const FeedbackService = require(`../service/service`);

class FeedbackController {

    async findAll(req, res) {
        const data = await FeedbackService.findAll()

        res.json(data)
    }

    async findByID(req, res) {
        const data = await FeedbackService.findByID(req.params.id)

        res.json(data)
    }

    async create(req, res) {
        const data = await FeedbackService.create(req.body)

        res.json(data)
    }

    async update(req, res) {
        const data = await FeedbackService.update(req.params.id, req.body)

        res.json(data)
    }

    async deleteByID(req, res) {
        await FeedbackService.deleteByID(req.params.id)

        res.json(`Success`)
    }

}

module.exports = new FeedbackController()