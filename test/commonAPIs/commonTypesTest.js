var chakram = require('chakram'),
    expect = chakram.expect;
var baseUrl=require('../../config/config.json');

describe("CommonTypes API testing using CHAKRAM", function () {
    it("Testing GET operation", function () {
        var response = chakram.get(baseUrl.dev + "/common/types");
        var jsonData;
        expect(response).to.have.status(200);
        expect(response).to.have.header('Access-Control-Allow-Headers');
        expect(response).not.to.have.header('Content-Lengths');
        return response.then(function (data) {
            jsonData = data.body;
            expect(jsonData[0].name).to.contain("CHOICE_QUIZ");
            expect(jsonData[5]).not.to.contain({name: "Upper seco"});
            expect(jsonData[1]).to.contain({lastmoduserid: 99999});
        });
        return chakram.wait();
    });
    var postRequest;
    var id;
    var name = Math.random().toString(32).slice(2);
    it("checking for posted data presence", function () {
        postRequest = chakram.post(baseUrl.dev + "/common/types", {
            entityid: 12,
            name: name,
            description: "just for testing purpose"
        });
        return postRequest.then(function (obj) {
            expect(obj).to.have.status(201);
            var postedData = obj.body;
            expect(postedData.name).to.contain(name);
            id = postedData.id;
        });
        return chakram.wait();
    });
    it("Testing GetByID after POST Operation ", function () {
        var getData;
        var response = chakram.get(baseUrl.dev + "/common/types/" + id);
        expect(response).to.have.status(200);
        expect(response).to.have.header('Access-Control-Allow-Headers');
        expect(response).not.to.have.header('Content-Lengths');
        return response.then(function(obj){
         getData=obj.body;
         expect(getData[0].name).to.contain(name);
         });
        return chakram.wait();
    });
    var putRequest;
    var name1 = Math.random().toString(32).slice(2);
    it("Testing PUT operation", function () {
        putRequest = chakram.put(baseUrl.dev + "/common/types/" + id, {
            name: name1
        });
        expect(putRequest).to.have.status(200);
        expect(putRequest).to.comprise.of.json({
            name: name1
        });
        return chakram.wait();
    });
    it("Testing GetByID after PUT Operation ", function () {
        var getData;
        var response = chakram.get(baseUrl.dev + "/common/types/" + id);
        expect(response).to.have.status(200);
        expect(response).to.have.header('Access-Control-Allow-Headers');
        expect(response).not.to.have.header('Content-Lengths');
        return response.then(function(obj){
            getData=obj.body;
            expect(getData[0].name).to.contain(name1);
        });
        return chakram.wait();
    });
    it("Testing DELETE operation", function () {
        var deleteData = chakram.delete(baseUrl.dev + "/common/types/" + id);
            expect(deleteData).to.have.status(200);
            expect(deleteData).to.have.header('Access-Control-Allow-Headers');
            expect(deleteData).to.comprise.of.json({
                message: "1 resource(s) deleted."
            });
        return chakram.wait();
    });
    it("Testing GetByID after DELETE operation", function () {
        var getData = chakram.delete(baseUrl.dev + "/common/types/" + id);
        expect(getData).to.have.status(404);
        expect(getData).to.have.header('Access-Control-Allow-Headers');
        expect(getData).to.comprise.of.json({
            "error": {
                "message": "Record Not Found To Delete"
            }
        });
        return chakram.wait();
    });
});

