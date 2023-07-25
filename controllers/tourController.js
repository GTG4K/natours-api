const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getAllTours = (req, res) => {
  res.status(200).json({ status: 'success', results: tours.length, data: { tours } });
};
exports.getTour = (req, res) => {
  const tourId = Number(req.params.id);
  const tour = tours.find(tour => tour.id === tourId);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};
exports.addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  });
};
exports.updateTour = (req, res) => {
  const tourId = Number(req.params.id);
  const tour = tours.find(tour => tour.id === tourId);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }

  res.status(200).json({ status: 'success', data: { tour: 'updated tour' } });
};
exports.deleteTour = (req, res) => {
  const tourId = Number(req.params.id);
  const tour = tours.find(tour => tour.id === tourId);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }

  res.status(204).json({ status: 'success', data: null });
};