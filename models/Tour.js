const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Tour name is required"],
      unique: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Tour price is required"],
    },
})
  
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;