const { Schema, model } = require("mongoose");
const formatDate = require("../utils/formatDate");

// implement reactions (schema ONLY)
const reactionSchema = new Schema(
  // REACTION has id (generate for each)
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // text content (280 characters max)
    reactionBody: { type: String, required: true, maxLength: 280 },
    // username as author
    username: { type: String, required: true },
    // createdAt - use formatDate helper
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal),
    },
  },
  {
    // initialize getter for formatting date
    toJSON: {
      getters: true,
    },
  }
);

const thoughtSchema = new Schema(
  {
    // THOUGHT has text content (1-280 char),
    text: { type: String, required: true, maxLength: 280 },
    // createdAt - use built-in date method
    // set default value to current timestamp
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter to format date on query
      get: (createdAtVal) => formatDate(createdAtVal),
    },
    // username (thought's author)
    username: { type: String, required: true },
    // reactions (replies)
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    strictPopulate: false,
  }
);

// create a virtual to retrieve length of reactions array
thoughtSchema
  .virtual("reactionCount")
  // getter
  .get(function () {
    // return key: value pair
    return this.reactions.length;
  });

// Initialize thought model
const Thought = model("thought", thoughtSchema);

// Create a new instance (document)
// Thought.create([
//   {
//     text: "I love living in Colorado",
//     createdAt: "",
//     username: "fairybones",
//     reactions: "",
//   },
// ]);

// Export model to be used elsewhere
module.exports = Thought;
