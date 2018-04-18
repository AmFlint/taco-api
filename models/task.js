const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      timestamps = require('mongoose-timestamps');

const subtask = new Schema({
    subtaskId: {
        type: Schema.Types.ObjectId,
        ref: 'Subtask',
        index: true
    }
});

const taskSchema = new Schema({
    title: {
        type: String,
        minlength: [5, 'Title\'s length must be at least 4 characters.'],
        maxlength: [100, 'Title\'s length may not exceed 100 characters.'],
        required: [true, 'Title can not be blank']
    },
    points: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        maxlength: [500, "Description's length must be less than 500 characters."]
    },
    status: {
        type: Boolean,
        default: false,
        required: [true, 'Task status can not be blank.']
    },
    subtasks: [subtask]
}, {collection: 'tasks'});

taskSchema.plugin(timestamps);

module.exports = mongoose.model('Task', taskSchema);