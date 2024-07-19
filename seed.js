const connection = require('./config/connection');
const { User, Thought } = require('./models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to db!');
    // make sure collections are ready to be populated
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length){
        await connection.dropCollection('users');
    }
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length){
        await connection.dropCollection('thoughts');
    }

    // seed user data
    const users = [
        {
            username: 'fairybones',
            email: 'annierules@gmail.com',
            thoughts: [],
            friends: [],
        },
        {
            username: 'mickeyAndcastiel',
            email: 'mickeyrules@gmail.com',
            thoughts: [],
            friends: [],
        },
        {
            username: 'dwelmBass',
            email: 'grags@gmail.com',
            thoughts: [],
            friends: [],
        },
        {
            username: 'teddyLove',
            email: 'tedsbed@gmail.com',
            thoughts: [],
            friends: [],
        },
        {
            username: 'a1ch3mist',
            email: 'lilred420@gmail.com',
            thoughts: [],
            friends: [],
        },
    ];

    // seed thought data
    const thoughts = [
        {
            text: 'This is my first post!',
            username: 'a1ch3mist',
        },
        {
            text: 'No thoughts, brain empty',
            username: 'mickeyAndcastiel',
        },
        {
            text: 'I like beans!',
            username: 'fairybones',
        },
        {
            text: 'Dubstep bangers only',
            username: 'teddyLove',
        },
        {
            text: 'Crafting is a super fun hobby!',
            username: 'a1ch3mist',
        },
        {
            text: 'This is a thought...',
            username: 'dwelmBass',
        },
        {
            text: 'Noodles are the best food',
            username: 'fairybones',
        },
        {
            text: 'Cass is a great dog',
            username: 'mickeyAndcastiel',
        },
        {
            text: 'Luna is a perfect puppy!',
            username: 'teddyLove',
        },
        {
            text: 'I want to go to Japan',
            username: 'dwelmBass',
        },
    ];
    try {
        // Insert thoughts
        const seedThoughts = await Thought.collection.insertMany(thoughts);
        console.table(thoughts);
        // Map thoughts to users
        const updatedUsers = users.map(user => {
        const userThoughts = thoughts.filter(thought => thought.username === user.username);
        user.thoughts = userThoughts.map(thought => thought._id);
        return user;
        });
        // Insert users
        const seedUsers = await User.collection.insertMany(updatedUsers);
        console.table(users);
        // Update friends references
        const userIds = seedUsers.ops.map(user => user._id);
        await User.updateMany({},
            { $set: { friends: userIds }});

        console.log('Friends list updated!');

        console.info('Seeding complete! 🌱');
        } catch (err) {
            console.error('Error seeding data:', err);
        } finally {
            process.exit(0);
        }
});