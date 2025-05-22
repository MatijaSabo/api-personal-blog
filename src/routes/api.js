const FeedbackController = require('../modules/feedbacks/controller/controller');

module.exports = async (app) => {
    app.get(`/api/v1/feedback`, FeedbackController.findAll);
    app.get(`/api/v1/feedback/:id`, FeedbackController.findByID);
    app.post(`/api/v1/feedback`, FeedbackController.create);
    app.patch(`/api/v1/feedback/:id`, FeedbackController.update);
    app.delete(`/api/v1/feedback/:id`, FeedbackController.deleteByID);
};