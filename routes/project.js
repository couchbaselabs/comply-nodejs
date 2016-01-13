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

    app.post("/api/project/addUser", function(req, res) {
        console.log(JSON.stringify(req.body));
        ProjectModel.getById(req.body.projectId, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            UserModel.find({email: req.body.email}, function(error, user) {
                if(error) {
                    return res.status(400).send(error);
                }
                if(users.length > 0) {
                    project.users.push(user[0]);
                    project.save(function(error) {
                        if(error) {
                            return res.status(400).send(error);
                        }
                        res.send(project);
                    });
                } else {
                    return res.status(400).send({"status": "error", "message": "User does not exist"});
                }
            });
        });
    });

};

module.exports = appRouter;
