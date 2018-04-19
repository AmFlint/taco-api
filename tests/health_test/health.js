const chai = require('chai'),
      chaiHttp = require('chai-http'),
      server = require('../../app'),
      should = chai.should();

chai.use(chaiHttp);

describe('/health', function () {
    it('It should return a 200 response code', function (done) {
        chai.request(server)
            .get('/health')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('healthy');
                response.body.healthy.should.be.equal(true);
                done();
            });
    })
});