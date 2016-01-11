var ProjectModel = require("../models/project");
var UserModel = require("../models/user");

var appRouter = function(app) {

    app.get("/api/project/get/:projectId", function(req, res) {
        if(!req.params.projectId) {
            return res.status(400).send({"status": "error", "message": "A project id is required"});
        }
        ProjectModel.getById(req.params.projectId, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(project);
        });
    });

    app.get("/api/project/getAll", function(req, res) {
        ProjectModel.find({}, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    app.post("/api/project/create", function(req, res) {
        console.log(JSON.stringify(req.body));
        var project = new ProjectModel({
            name: req.body.name,
            description: req.body.description,
            owner: UserModel.ref(req.body.owner),
            users: [UserModel.ref(req.body.owner)],
            status: "active"
        });
        project.save(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(req.body);
        });
    });

};

module.exports = appRouter;
