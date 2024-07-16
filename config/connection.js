const mongoose = require('mongoose');

// connect mongoose ODM to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/');

// export connection
module.exports = mongoose.connection;