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
            /*var response = {};
            response._id = project._id;
            response.name = project.name;
            response.description = project.description;
            response.owner = project.owner;
            response.users = [];
            response.tasks = [];
            for(var i = 0; i < project.users.length; i++) {
                response.users.push({
                    name: {
                        first: project.users[i].name.first,
                        last: project.users[i].name.last
                    },
                    email: project.users[i].email
                });
            }
            for(var i = 0; i < project.tasks.length; i++) {
                response.tasks.push({
                    id: project.tasks[i]._id,
                    users: project.tasks[i].users,
                    history: project.tasks[i].history,
                    name: project.tasks[i].name,
                    description: project.tasks[i].description,
                    owner: project.tasks[i].owner,
                    assignedTo: project.tasks[i].assignedTo
                });
            }
            res.send(response);*/
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
        ProjectModel.find({"_id": req.params.projectId}, {load: ["users"]}, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            var users = [];
            for(var i = 0; i < project[0].users.length; i++) {
                users.push({
                    id: project[0].users[i]._id,
                    users: project[0].users[i].name.first,
                    history: project[0].users[i].name.last,
                    name: project[0].users[i].email
                });
            }
            res.send(users);
        });
    });

};

module.exports = appRouter;
