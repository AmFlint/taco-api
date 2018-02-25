const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      timestamps = require('mongoose-timestamps');

const storySchema = new Schema({
    title: {
        type: String,
        minlength: [5, 'Title\'s length must be at least 4 characters.'],
        maxlength: [100, 'Title\'s length may not exceed 100 characters.'],
        required: true
    },
    storyPoints: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        maxlength: [300, "Description's length must be less than 300 characters."]
    }
}, {collection: 'stories'});

storySchema.plugin(timestamps);

module.exports = mongoose.model('Story', storySchema);