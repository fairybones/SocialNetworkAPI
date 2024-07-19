const { Thought, User } = require('../models');

const mongoose = require('mongoose');
const thought = new Thought({
    _id: new mongoose.Types.ObjectId(),
    text: Thought.text
});

module.exports = {
// GET all users
async getUsers(req, res) {
    try {
        const users = await User.find().populate('thought');
        res.status(200).json(users);
    } catch (err) {
        console.log('Oops! Something went wrong', err);
        res.status(500).json(err);
    }
},
// GET a single user by ID
async getUser(req, res) {
    try {
        const user = await User.findById(req.params.id).populate('thought');
    // handle error if user does not exist
    if (!user) {
        return res.status(404).json({ message: 'No user found matching that ID'})
    }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},
// CREATE a new user
async newUser(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},
// UPDATE a user by ID
async putUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            // { runValidators: true },
            { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found matching that id.' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log('Something went wrong trying to update', err);
        res.status(500).json(err);
    }
},
// DELETE a user by ID
async deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'No user found matching that id.' });
        }
        res.status(200).json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log('Cannot delete user', err);
        res.status(500).json(err);
    }
},
// Add/Remove users from friends list
async addFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(req.params.id, 
            { $addToSet: { friends: req.params.friendId }},
            // { runValidators: true },
            { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found matching that ID'});
        }
        res.status(200).json(user);
    } catch (err) {
        console.log('Trouble adding user to friends list');
        res.status(500).json(err);
    }
},
async removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(req.params.id,
            { $pull: { friends: req.params.friendsId }},
            // { runValidators: true },
            { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found matching that id.' });
        }
        return res.status(200).json(friend);
    } catch (err) {
        console.log(`Trouble removing ${user} from friends list`);
        res.status(500).json(err);
    }
}
};