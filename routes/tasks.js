const Task = require('../models/task');
const express = require('express');
// Create subRouter and accept parameters from parent router
const router = express.Router({mergeParams: true});
// TODO: Implement board notion to tasks management.
// ---- Check for task's existence based on URL parameter 'taskId' ---- //
router.param('taskId', function(req, res, next) {
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
router.post('/', function(req, res, next) {
    const data = req.body;
    const task = new Task(data);

    // -- Remove status from request body
    data.status = undefined;

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
router.get('/', function(req, res, next) {
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
router.get('/:taskId', function(req, res, next) {
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
router.delete('/:taskId', function(req, res, next) {
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
router.put('/:taskId', function(req, res, next) {
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

module.exports = router;