const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour name is required'],
      unique: true,
      maxlength: [40, 'Tour name can not be longer than 40 characters'],
      minlength: [5, 'Tour name can not be shorter than 5 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Tour duration is required'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour group size is required'],
    },
    difficulty: {
      type: String,
      required: [true, 'Tour difficulty is required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty should be easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Tour price is required'],
      min: [50, 'Price must be at least 50$'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return val < this.price;
        },
        message: 'Price discount ({VALUE}) can not be higher than the price',
      },
    },
    summary: {
      type: String,
      required: [true, 'Tour summary is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'tour imageCover is required'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, remove: '.' });
  next();
});

// QUERY MIDDLEWARE: runs before .find()
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// AGGREGATION MIDDLEWARE: runs before .aggregate()
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
