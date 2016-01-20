var ProjectModel = require("../models/project");
var UserModel = require("../models/user");

var appRouter = function(app) {

    app.get("/api/project/get/:projectId", function(req, res) {
        if(!req.params.projectId) {
            return res.status(400).send({"status": "error", "message": "A project id is required"});
        }
        ProjectModel.getById(req.params.projectId, {load: ["users", "tasks"]}, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(project);
        });
    });

    app.get("/api/project/getAll/:ownerId?", function(req, res) {
        if(req.params.ownerId) {
            ProjectModel.findByOwner(UserModel.ref(req.params.ownerId), function(error, result) {
                if(error) {
                    return res.status(400).send(error);
                }
                res.send(result);
            });
        } else {
            ProjectModel.find({}, function(error, result) {
                if(error) {
                    return res.status(400).send(error);
                }
                res.send(result);
            });
        }
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
            res.send(project);
        });
    });

    app.post("/api/project/addUser", function(req, res) {
        console.log(JSON.stringify(req.body));
        ProjectModel.getById(req.body.projectId, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            UserModel.find({email: req.body.email}, function(error, users) {
                if(error) {
                    return res.status(400).send(error);
                }
                if(users.length > 0) {
                    project.users.push(users[0]);
                    project.save(function(error) {
                        if(error) {
                            return res.status(400).send(error);
                        }
                        res.send(users[0]);
                    });
                } else {
                    return res.status(400).send({"status": "error", "message": "User does not exist"});
                }
            });
        });
    });

    app.get("/api/project/getUsers/:projectId", function(req, res) {
        if(!req.params.projectId) {
            return res.status(400).send({"status": "error", "message": "A project id is required"});
        }
        ProjectModel.getById(req.params.projectId, {load: ["users"]}, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(project.users);
        });
    });

};

module.exports = appRouter;
