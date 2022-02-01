const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour name can not exceed 40 characters'],
    minlength: [2, 'A tour name must have minimum 2 characters']
  },
  description: {
    type: String,
    required: [true, 'A tour must have description'],
    trim: true
  },
  date: String,
  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty'],
    enum: {
      values: ['EASY', 'MEDIUM', 'HARD'],
      message: `Chose difficulty from: 'easy', 'medium', 'hard`
    }
  },
  trail_length: {
    type: Number,
    required: [true, 'A tour must have trail_length']
  },
  max_participants: {
    type: Number,
    required: [true, 'A tour must have group size']
  },
  /*
  images: {
    type: [String]
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have cover image']
  },
  coordinates: {
    type: [Number]
  },
  */
  user_created: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Tour must belong to a user']
  },
  date_created: {
    type: Date,
    default: Date.now(),
    select: false
  },
}, { collection: 'tour' });

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;
