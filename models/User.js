const { Schema, model } = require("mongoose");

// Construct a new instance of the schema class
const userSchema = new Schema(
  {
    // USER has username - NEEDS TO BE UNIQUE,
    username: { type: String, required: true, trim: true, unique: true },
    // email (validate!), thoughts,
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    // friends (with id values - reference user id)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  // create a virtual to retrieve length of user's [friends] array
  {
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);

userSchema
  .virtual("friendCount")
  // getter
  .get(function () {
    // return key: value pair
    return this.friends.length;
  });

// Initialize user model
const User = model("user", userSchema);

// Create a new instance (document)
// User.create([
//   {
//     username: "fairybones",
//     email: "aeschalna@gmail.com",
//     thoughts: "This is my first post!",
//     friends: "mickeyAndcastiel",
//   },
// ]);

// Export model to be used elsewhere
module.exports = User;
