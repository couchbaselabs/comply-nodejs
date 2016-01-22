var TaskModel = require("../models/task");
var ProjectModel = require("../models/project");
var UserModel = require("../models/user");

var appRouter = function(app) {

    app.get("/api/task/get/:taskId", function(req, res) {
        if(!req.params.taskId) {
            return res.status(400).send({"status": "error", "message": "A task id is required"});
        }
        TaskModel.getById(req.params.taskId, {load: ["users", "assignedTo"]}, function(error, task) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(task);
        });
    });

    /*
     * Create a new task document and push a reference to the matching project document
     */
    app.post("/api/task/create/:projectId", function(req, res) {
        var task = new TaskModel({
            name: req.body.name,
            description: req.body.description,
            owner: UserModel.ref(req.body.owner),
            assignedTo: UserModel.ref(req.body.assignedTo),
            users: [UserModel.ref(req.body.owner)]
        });
        task.save(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            ProjectModel.getById(req.params.projectId, function(error, project) {
                if(error) {
                    return res.status(400).send(error);
                }
                project.tasks.push(task);
                project.save(function(error, result) {
                    if(error) {
                        return res.status(400).send(error);
                    }
                    res.send(task);
                });
            });
        });
    });

    app.post("/api/task/addUser", function(req, res) {
        TaskModel.getById(req.body.taskId, function(error, task) {
            if(error) {
                return res.status(400).send(error);
            }
            UserModel.find({email: req.body.email}, function(error, users) {
                if(error) {
                    return res.status(400).send(error);
                }
                if(users.length > 0) {
                    task.users.push(users[0]);
                    task.save(function(error) {
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

    app.post("/api/task/addHistory", function(req, res) {
        TaskModel.getById(req.body.taskId, function(error, task) {
            if(error) {
                return res.status(400).send(error);
            }
            var history = {
                log: req.body.log,
                user: UserModel.ref(req.body.userId)
            }
            task.history.push(history);
            task.save(function(error) {
                if(error) {
                    return res.status(400).send(error);
                }
                UserModel.getById(req.body.userId, function(error, user) {
                    if(error) {
                        return res.status(400).send(error);
                    }
                    res.send({log: req.body.log, user: user});
                })
            });
        });
    });

};

module.exports = appRouter;
