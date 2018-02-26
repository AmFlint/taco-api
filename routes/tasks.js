const Task = require('../models/task');

// TODO: Implement board notion to tasks management.
router = function(server) {

    // Create a Task
    server.post('/boards/:boardId/tasks/', function(req, res, next) {
        const data = req.body;
        const task = new Task(data);
        task.validate()
            .then(() => {
                task.save()
                    .then(task => res.send(200, task))
                    .catch(err => res.send(500, err));
            })
            .catch(err => res.send(400, err));
    });

// List tasks
    server.get('/boards/:boardId/tasks/', function(req, res, next) {
        Task.find().exec()
            .then(tasks => {
                // -- Format response -- //
                const response = {
                    boards: {
                        [req.params.boardId]: {
                            tasks
                        }
                    }
                };

                res.status(200).send(response);
            })
            .catch(err => res.status(500).send(err));
    });

// Get single task
    server.get('/boards/:boardId/tasks/:id', function(req, res, next) {
        Task.findOne({_id: req.params.id})
            .then(task => {
                if (!task) {
                    res.status(404).send({message: 'No task found', status: 404});

                }

                // -- Format Response -- //
                const response = {
                    boards: {
                        [req.params.boardId]: {
                            tasks: [
                                task
                            ]
                        }
                    }
                };
                return res.status(200).send(response);
            })
            .catch(err => res.status(404).send(err));
    });

// Delete a task
    server.delete('/boards/:boardId/tasks/:id', function(req, res, next) {
        Task.findOne({_id: req.params.id})
            .then(task => {
                if (!task) {
                    res.status(404).send({message: 'Task not found', status: 404});
                }
                task.remove()
                    .then(task => res.status(200).send(task))
                    .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
    });

};

module.exports = router;