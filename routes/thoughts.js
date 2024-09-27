const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// Get all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.status(200).send(thoughts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Create a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();
    res.status(201).send(thought);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Update a thought
router.put('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!thought) {
      return res.status(404).send();
    }
    res.status(200).send(thought);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Delete a thought
router.delete('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).send();
    }
    res.status(200).send(thought);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).send();
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(200).send(thought);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Remove a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).send();
    }
    thought.reactions.id(req.params.reactionId).remove();
    await thought.save();
    res.status(200).send(thought);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
