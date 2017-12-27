const chakram = require('chakram');
const expect = chakram.expect;

describe("Chakram", function() {
    it("should offer simple HTTP request capabilities", function () {
        return chakram.get("http://httpbin.org/get");
    });
});

describe("Chakram", function() {
    it("should provide HTTP specific assertions", function () {
        var response = chakram.get("http://localhost/test");
        return expect(response).to.have.status(200);
    });
});