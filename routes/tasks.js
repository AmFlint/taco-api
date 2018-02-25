const express = require('express'),
      router = express.Router(),
      Task = require('../models/task');

// TODO: Implement board notion to tasks management.

// Create a Task
router.post('/', function(req, res, next) {
   const data = req.body;
   const task = new Task(data);
   task.validate()
       .then(() => {
           task.save()
               .then(task => res.send(200, task))
               .catch(err => res.send(500, error));
       })
       .catch(err => res.send(400, err));
});

// List tasks
router.get('/', function(req, res, next) {
   Task.find().exec()
       .then(tasks => res.status(200).send(tasks))
       .catch(err => res.status(500).send(err));
});

// Get single task
router.get('/:id', function(req, res, next) {
    Task.findOne({_id: req.params.id})
        .then((task) => {
            if (task) {
                res.status(200).send(task)
            }
            res.status(404).send({message: 'No task found', status: 404});
        })
        .catch(err => res.status(404).send(err));
});

module.exports = router;