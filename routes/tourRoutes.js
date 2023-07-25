const express = require('express');
const tourRouter = express.Router();
const tourController = require('../controllers/tourController');

tourRouter.route('/').get(tourController.getAllTours).post(tourController.addTour);
tourRouter.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = tourRouter;