const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema(
    // REACTION has id (generate for each)
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // text content (280 characters max)
        reactionBody: { type: String, required: true, maxLength: 280},
        // username as author
        username: { type: String, required: true },
        // createdAt - use formatDate helper
        createdAt: { type: Date, default: Date.now, 
            get: (createdAtVal) => formatDate(createdAtVal),
        }
    },
    { // initialize getter for formatting date
        toJSON: {
            getters: true
        }
    }
);

// initialize schema
const Reaction = 
// export schema
module.exports