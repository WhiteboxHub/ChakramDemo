var chakram = require('chakram'),
    expect = chakram.expect;

describe("API testing using CHAKRAM", function () {
    it("Testing lookup education levels GET operation", function () {
        var response = chakram.get("http://104.154.27.150/api/v1/lookup/education/levels");
        var jsonData;
        expect(response).to.have.status(200);
        expect(response).to.have.header('Access-Control-Allow-Headers');
        expect(response).not.to.have.header('Content-Lengths');
        return response.then(function (data) {
               jsonData = data.body;
               expect(jsonData[0].name).to.contain("Upper secondary education ve");
            expect(jsonData[5]).not.to.contain({name:"Upper seco"});
            expect(jsonData[1]).to.contain({lastmoduserid: 99999});
        });
        return chakram.wait();
    });
});
describe("API testing using CHAKRAM", function () {
    it("Testing lookup education levels DELETE operation", function () {
        var deleteData = chakram.delete("http://104.154.27.150/api/v1/lookup/education/levels/45");
        expect(deleteData).to.have.status(200);
        expect(deleteData).to.have.header('Access-Control-Allow-Headers');
      expect(deleteData).to.comprise.of.json({
        message:"1 resource(s) deleted."
      });
        return chakram.wait();
    });
});
describe("API testing using CHAKRAM", function () {
        var postRequest;
        it("checking for posted data presence", function () {
            postRequest = chakram.post("http://104.154.27.150/api/v1/lookup/education/levels", {
                name: "Less than primary education11123456789",
                description: "A broad level of educational attainment covering no participation in education, some participation",
                lastmoddatetime: "2016-06-16T20:36:21.000Z",
                lastmoduserid: 99999
            });
            return postRequest.then(function (obj) {
                expect(obj).to.have.status(201);
                var postedData=obj.body;
                expect(postedData).to.contain({name: "Less than primary education11123456789"});
            });
            return chakram.wait();
    });
 });

describe("API testing using CHAKRAM", function () {
    var putRequest;
    it("Testing PUT operation", function () {
            putRequest = chakram.put("http://104.154.27.150/api/v1/lookup/education/levels/6", {
                name: "Post-secondary non-tertiary education112211"
            });
        expect(putRequest).to.have.status(200);
        expect(putRequest).to.comprise.of.json({
            name: "Post-secondary non-tertiary education112211"
        });
        return chakram.wait();
    });
});


