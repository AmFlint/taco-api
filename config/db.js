const mongoose = require('mongoose');
const bluebird = require('bluebird');
// Database informations - Host and Credentials
const DB_HOST = process.env.DB_HOST || 'taco_mongo',
      DB_PORT = process.env.DB_PORT || 27017,
      DB_NAME = process.env.DB_NAME || 'taco',
      DB_USERNAME = process.env.DB_USERNAME || '',
      DB_PASSWORD = process.env.DB_PASSWORD || '';

// Combine username and password to fit mongodb connection criteria, empty string if no credentials
const DB_CREDENTIALS = DB_USERNAME && DB_PASSWORD ? `${DB_USERNAME}:${DB_PASSWORD}@` : '',
      DB_HOST_PORT = `${DB_HOST}:${DB_PORT}`;

// MongoDB options object
const options = {
    useMongoClient: true
};

mongoose.Promise = bluebird;
mongoose.connect(`mongodb://${DB_CREDENTIALS}${DB_HOST_PORT}/${DB_NAME}`, options);

module.exports = mongoose.connection;