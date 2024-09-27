const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = mongoose.model('User', UserSchema);
