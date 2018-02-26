const Subtask = require('../models/subtask'),
      Task = require('../models/task');

// TODO: Implement board notion to tasks management.

router = function(server) {

    // ---- Check for task's existence based on URL parameter 'taskId'
    server.param('taskId', function(req, res, next) {
        Task.findOne({_id: req.params.taskId})
            .then(task => {
                if (task) {
                    req.params.task = task;
                    return next();
                }
                // Task not found
                res.status(404).send({message: "Task Not Found", status: 404});
                res.end();
            })
            .catch(err => res.status(500).send(err).end());
    });

    // ---- Create a Subtask ---- //
    server.post('/boards/:boardId/tasks/:taskId/subtasks/', function(req, res, next) {
        const task = req.params.task;
        const taskId = task._id;

        // Create data object - parent task id + request body
        const data = Object.assign({}, req.body, {taskId});

        // Subtask Status not accepted from User Input on this Endpoint
        data.status = undefined;

        // Create subtask Model with given data
        const subtask = new Subtask(data);
        // Input validation
        subtask.validate()
            .then(() => {
                // Validation succeeded => Save subtask to DB
                subtask.save()
                    .then(subtask => {
                        // Then, save subtask reference inside associated Task
                        task.subtasks.push({subtaskId: subtask._id});
                        task.save()
                            // Send response with subtask object
                            .then(task => res.status(200).send(subtask))
                            .catch(err => res.status(500).send(err))
                    })
                    .catch(err => res.status(500).send(err));
            })
            // Validation failed
            .catch(err => res.send(400, err));

    });

    server.get('/boards/:boardId/tasks/:taskId/subtasks/', function (req, res, next) {
        const taskId = req.params.task._id;

        Subtask.find({taskId}).exec()
            .then(subtasks => {
                const response = {
                    boards: {
                        [req.params.boardId]: {
                            tasks: {
                                [taskId]: {
                                    subtasks
                                }
                            }
                        }
                    }
                };

                res.status(200).send(response);
            })
            .catch(err => res.status(500).send(err));
    });
};

module.exports = router;