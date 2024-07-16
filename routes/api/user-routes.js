const router = require("express").Router();

const {
  getUsers,
  getUser,
  newUser,
  putUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// routes to endpoint `/api/users`
router.route("/").get(getUsers).post(newUser);
// `/api/users/:id`
router.route("/:id").get(getUser).put(putUser).delete(deleteUser);
// add/delete a friend
router.route("/:id/friends/friendId").put(addFriend).delete(removeFriend);

module.exports = router;
