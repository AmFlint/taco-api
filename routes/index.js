const tasks = require('./tasks'),
      subtasks = require('./subtasks'),
      health = require('./health');

const router = function(server) {
    // ---- Misc. Routes ---- //

    // -- Health Endpoint -- //
    server.use('/health', health);

    // ---- Tasks Routes / Controller ---- //
    // /boards/:boardId/tasks/
    server.use('/boards/:boardId/tasks', tasks);

    // ---- Subtasks Routes / Controller ---- //
    // /boards/:boardId/tasks/:taskId/subtasks
    tasks.use('/:taskId/subtasks', subtasks);
};

module.exports = router;