const mongoose = require('mongoose');
const Tour = require('../models/Tour');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: './config.env' });

const DB = process.env.MONGODB_DATABASE.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Tour.deleteMany();
    await Tour.create(tours);
    console.log('data loaded');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

importData();

console.log(process.argv);
