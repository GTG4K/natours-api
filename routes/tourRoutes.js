const express = require('express');
const tourRouter = express.Router();
const tourController = require('../controllers/tourController');
const middlewareTop5 = require('../middleware/aliasTopTours');

tourRouter.param('id', (req, res, next, value) => {
  console.log(`Tour ID is ${value} 😘`);
  next();
});

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addTour);
tourRouter.route('/stats').get(tourController.getTourStats);
tourRouter.route('/top-5').get(middlewareTop5, tourController.getAllTours);
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
