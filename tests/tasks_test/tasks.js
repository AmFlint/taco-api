const chai = require('chai'),
      chaiHttp = require('chai-http'),
      server = require('../../app'),
      mongoose = require('mongoose'),
      Task = require('../../models/task'),
      should = chai.should();

chai.use(chaiHttp);

// Setting up test
const boardId = 1;

function getTaskCreateUrl(boardId) {
    return `/boards/${boardId}/tasks`;
}

function getValidTask() {
    return {
        title: "Testing create Task endpoint",
        points: 10,
        description: 'Description about creating a test Task'
    };
}


describe('Test POST on tasks (Create a Task)', function () {
    // Create a Task with Valid informations
   it('It should create a Task with valid input data', function (done) {
        const task = getValidTask();
        const taskUrl = getTaskCreateUrl(boardId);
        const agent = chai.request(server)
            .post(taskUrl)
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('boards');
                res.body.boards.should.have.property(boardId);
                res.body.boards[boardId].should.have.property('tasks');
                res.body.boards[boardId].tasks.length.should.be.equal(1);

                var responseTask = res.body.boards[boardId].tasks[0];
                if (responseTask) {
                    responseTask.should.have.property('title');
                    responseTask.title.should.be.equal("Testing create Task endpoint");
                }
                done();
            });
   });
});
