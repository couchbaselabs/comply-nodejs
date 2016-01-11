var TaskModel = require("../models/task");
var ProjectModel = require("../models/project");

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
        ProjectModel.getById(req.params.projectId, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

};

module.exports = appRouter;
