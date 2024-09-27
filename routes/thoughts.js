const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const User = require('../models/User');

// Get all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.status(200).send(thoughts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/users/:userId/thoughts', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const thought = new Thought({
      thoughtText: req.body.thoughtText,
      username: user.username,
    });
    await thought.save();
    user.thoughts.push(thought._id);
    await user.save();
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get a single thought by ID
router.get('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a thought by ID
router.put('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { thoughtText: req.body.thoughtText },
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).send({ message: 'Thought not found' });
    }
    res.status(200).send(thought);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Delete a thought by ID
router.delete('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).send({ message: 'Thought not found' });
    }
    res.status(200).send({ message: 'Thought deleted successfully.' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).send({ message: 'Thought not found' });
    }

    thought.reactions.push({
      reactionBody: req.body.reactionBody,
      username: req.body.username,
    });

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
      return res.status(404).send({ message: 'Thought not found' });
    }

    const reaction = thought.reactions.id(req.params.reactionId);
    if (!reaction) {
      return res.status(404).send({ message: 'Reaction not found' });
    }

    reaction.remove();
    await thought.save();
    res.status(200).send(thought);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;