const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ status: 'success', results: tours.length, data: { tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tourId = Number(req.params.id);
  const tour = tours.find(tour => tour.id === tourId);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {

});
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});