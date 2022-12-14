import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema({
  webhookURL: {
    type: String,
    required: [true, 'Please provide a webhook URL for this reminder.'],
    maxlength: [256, 'URL cannot be more than 256 characters.'],
  },
  roles: {
    type: Array,
    required: false,
  },
});

export default mongoose.models.Reminder ||
  mongoose.model('Reminder', ReminderSchema);
