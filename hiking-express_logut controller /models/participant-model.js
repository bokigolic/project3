const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Participant must belong to a tour']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Participant must belong to a user']
  }
}, { collection: 'participant' });

const Participant = mongoose.model('participant', participantSchema);

module.exports = Participant;
