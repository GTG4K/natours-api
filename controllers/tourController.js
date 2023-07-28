const Tour = require('../models/Tour');

exports.getAllTours = async (req, res) => {
  try{
    const tours = await Tour.find()

    res.status(200).json(
      { status: 'success', 
      results: tours.length, 
      data: { tours } 
    });
  }catch(err){
    res.status(404).json(
      { status: 'fail', 
      message: err
    });
  }

};

exports.getTour = (req, res) => {
  // const tourId = Number(req.params.id);
  // const tour = tours.find(tour => tour.id === tourId);

  // if (!tour) {
  //   res.status(404).json({ status: 'fail', message: 'Tour not found' });
  // }

  // res.status(200).json({ status: 'success', data: { tour } });
};
exports.addTour = async (req, res) => {
  try{
    const newTour = await Tour.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour 
      } 
    });
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateTour = (req, res) => {
  // const tourId = Number(req.params.id);
  // const tour = tours.find(tour => tour.id === tourId);

  // if (!tour) {
  //   res.status(404).json({ status: 'fail', message: 'Tour not found' });
  // }

  // res.status(200).json({ status: 'success', data: { tour: 'updated tour' } });
};
exports.deleteTour = (req, res) => {
  // const tourId = Number(req.params.id);
  // const tour = tours.find(tour => tour.id === tourId);

  // if (!tour) {
  //   res.status(404).json({ status: 'fail', message: 'Tour not found' });
  // }

  // res.status(204).json({ status: 'success', data: null });
};
