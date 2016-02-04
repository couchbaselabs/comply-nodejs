var multer = require('multer');
var TaskModel = require("../models/task");
var ProjectModel = require("../models/project");
var UserModel = require("../models/user");

var appRouter = function (app) {

    app.post('/api/cdn/add', multer({dest: './cdn/'}).single('upl'), function (req, res) {
        TaskModel.getById(req.body.taskId, function (error, task) {
            if (error) {
                return res.status(400).send(error);
            }
            var history = {
                log: req.body.description,
                user: UserModel.ref(req.body.userId),
                photos: [{filename: req.file.filename, extension: req.file.originalname.split('.').pop()}],
                createdAt: (new Date())
            }
            task.history.push(history);
            task.save(function (error) {
                if (error) {
                    return res.status(400).send(error);
                }
                UserModel.getById(req.body.userId, function (error, user) {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    res.send({log: req.body.description, user: user, createdAt: history.createdAt,
                        photos: [{filename: req.file.filename, extension: req.file.originalname.split('.').pop()}]});
                });
            });
        });
    });
}

module.exports = appRouter;