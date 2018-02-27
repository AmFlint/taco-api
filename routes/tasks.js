const Task = require('../models/task');

// TODO: Implement board notion to tasks management.
router = function(server) {

    // ---- Check for task's existence based on URL parameter 'taskId' ---- //
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

    // Create a Task
    server.post('/boards/:boardId/tasks/', function(req, res, next) {
        const data = req.body;
        const task = new Task(data);
        task.validate()
            .then(() => {
                task.save()
                    .then(task => {
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

                        res.send(200, response);
                    })
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
    server.get('/boards/:boardId/tasks/:taskId', function(req, res, next) {
        // -- Format Response -- //
        const response = {
            boards: {
                [req.params.boardId]: {
                    tasks: [
                        req.params.task
                    ]
                }
            }
        };
        return res.status(200).send(response);
    });

// Delete a task
    server.delete('/boards/:boardId/tasks/:taskId', function(req, res, next) {
        req.params.task.remove()
            .then(task => {

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

                res.status(200).send(response);
            })
            .catch(err => res.status(500).send(err));
    });

  // Update a Task
  server.put('/boards/:boardId/tasks/:taskId', function(req, res, next) {
    const data = req.body;
    const task = req.params.task;

    task.set(data);
    task.validate()
        .then(() => {
            task.save()
                .then(task => {
                    const response = {
                        boards: {
                            [req.params.boardId]: {
                                tasks: [
                                    task
                                ]
                            }
                        }
                    };

                    res.status(200).send(response);
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(400).send(err));
  });

};

module.exports = router;