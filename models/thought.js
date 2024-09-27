const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Reactions
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
}, {
  _id: false, // To avoid generating automatic _id for subdocuments
  toJSON: { getters: true },
  toObject: { getters: true },
});

// Schema for Thoughts
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema], // Array of reactions
}, {
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true },
});

// Virtual to get the number of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create and export the Thought model
const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;