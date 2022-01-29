const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: [true, 'Review cannot be empty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'review' });

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
