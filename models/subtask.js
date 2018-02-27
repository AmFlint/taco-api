const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamps');

const subtaskSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        index: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        minlength: [5, 'Title\'s length must be at least 4 characters.'],
        maxlength: [100, 'Title\'s length may not exceed 100 characters.'],
        required: [true, 'Title is required in order to create a Subtask']
    },
    status: {
        type: String,
        enum: [
          'in progress',
          'done'
        ],
        default: 'in progress',
        required: [true, 'Subtask status can not be blank.']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description's length must be less than 500 characters."]
    }
}, {collection: 'subtasks'});

subtaskSchema.plugin(timestamps);

module.exports = mongoose.model('Subtask', subtaskSchema);