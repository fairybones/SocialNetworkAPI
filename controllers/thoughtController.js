const { Thought, User } = require("../models");
// const router = require('express').Router();

module.exports = {
  // READ all posts/thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("user");
      res.status(200).json(thoughts);
    } catch (err) {
      console.log("No thoughts, brain empty", err);
      res.status(500).json(err);
    }
  },
  // READ a single thought by its id value
  async getThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.id).populate("user");
      if (!thought) {
        return res.status(404).json({ message: "No thought matching that id" });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // CREATE a new thought
  async postThought(req, res) {
    try {
      const thought = new Thought(req.body);
      await thought.save();
      res.status(200).json(thought);
    } catch (err) {
      console.log("Cannot post, please try again", err);
      res.status(500).json(err);
    }
  },
  // CREATE a new reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.id,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Reactions only apply to existing thoughts" });
      }
      res.status(200).json(reaction);
    } catch (err) {
      console.log("Reaction failed", err);
      res.status(500).json(err);
    }
  },
  // UPDATE an existing thought by id
  async putThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!thought) {
        return res
          .status(400)
          .json({ message: "No thought found matching that id." });
      }
      res.status(200).json(thought);
    } catch (err) {
      console.log("Something went wrong trying to update", err);
      res.status(500).json(err);
    }
  },
  // DELETE an existing thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      // check that thought exists before deleting
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Thought does not exist... yet" });
      }
      res.status(200).json({ message: "Thought successfully deleted! " });
    } catch (err) {
      console.log("Cannot delete thought", err);
      res.status(500).json(err);
    }
  },
  // DELETE an existing reaction by id
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findByIdAndUpdate(
        req.params.id,
        { $pull: { reactions: { _id: req.body.reactionId } } },
        { new: true }
      );
      if (!reaction) {
        return res
          .status(404)
          .json({ message: "Reaction does not exist... yet" });
      }
      res.status(200).json(reaction);
    } catch (err) {
      console.log("Cannot delete reaction", err);
      res.status(500).json(err);
    }
  },
};
