const routes = require('express').Router();

const controller = require('../controller/controller');
routes
    .route('/api/categories')
    .get(controller.getCategories)
    .post(controller.createCategories);

routes
    .route('/api/transaction')
    .get(controller.getTransaction)
    .post(controller.createTransaction)
    .delete(controller.deleteTransaction);

routes.route('/api/labels').get(controller.getLabels);

module.exports = routes;
