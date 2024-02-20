const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reminderSchema = new Schema({
  reminderText: {
    type: String,
    required: 'Leave a reminder here...',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  reminderAbout: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Reminder = model('Reminder', reminderSchema);

module.exports = Reminder;
