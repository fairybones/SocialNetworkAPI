const router = require('express').Router();

const {
    getThoughts,
    getThought,
    postThought,
    addReaction,
    putThought,
    deleteThought,
    deleteReaction
} = require('../../controllers/thoughtController');

// routes to endpoint `/api/thoughts`
router.route('/').get(getThoughts).post(postThought);
// `/api/thoughts/:id`
router.route('/:id').get(getThought).put(putThought).delete(deleteThought);
// add/remove a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;