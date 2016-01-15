var TaskModel = require("../models/task");
var ProjectModel = require("../models/project");
var UserModel = require("../models/user");
var promise = require("bluebird");

var appRouter = function(app) {

    app.get("/api/task/get/:taskId", function(req, res) {
        if(!req.params.taskId) {
            return res.status(400).send({"status": "error", "message": "A task id is required"});
        }
        TaskModel.getById(req.params.taskId, function(error, task) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(task);
        });
    });

    app.get("/api/task/getAll/:projectId", function(req, res) {
        if(!req.params.projectId) {
            return res.status(400).send({"status": "error", "message": "A project id is required"});
        }
        ProjectModel.find({"_id": req.params.projectId}, {load: ["tasks"]}, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            var tasks = [];
            for(var i = 0; i < project[0].tasks.length; i++) {
                tasks.push({
                    id: project[0].tasks[i]._id,
                    users: project[0].tasks[i].users,
                    history: project[0].tasks[i].history,
                    name: project[0].tasks[i].name,
                    description: project[0].tasks[i].description,
                    owner: project[0].tasks[i].owner,
                    assignedTo: project[0].tasks[i].assignedTo
                });
            }
            res.send(tasks);
        });
    });

    /*
     * Create a new task document and push a reference to the matching project document
     */
    app.post("/api/task/create/:projectId", function(req, res) {
        console.log(JSON.stringify(req.body));
        var task = new TaskModel({
            name: req.body.name,
            description: req.body.description,
            owner: UserModel.ref(req.body.owner),
            assignedTo: UserModel.ref(req.body.assignedTo)
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
                    res.send(req.body);
                });
            });
        });
    });

};

module.exports = appRouter;
