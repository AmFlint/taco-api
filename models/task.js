const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      timestamps = require('mongoose-timestamps');

const taskSchema = new Schema({
    title: {
        type: String,
        minlength: [5, 'Title\'s length must be at least 4 characters.'],
        maxlength: [100, 'Title\'s length may not exceed 100 characters.'],
        required: [true, 'Title is required in order to create a Task']
    },
    points: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        maxlength: [300, "Description's length must be less than 300 characters."]
    }
}, {collection: 'tasks'});

taskSchema.plugin(timestamps);

module.exports = mongoose.model('Task', taskSchema);