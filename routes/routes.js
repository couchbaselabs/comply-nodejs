//// ▶▶ require objects ◀◀ ////
var ottoman = require('ottoman');
var bodyParser = require('body-parser');
var db = require('../schema/db');

var user = require('../schema/model/user');
var company = require('../schema/model/company');
var project = require('../schema/model/project');
var task = require('../schema/model/task');

//// ▶▶ application/json parser ◀◀ ////
var jsonParser = bodyParser.json();

//// ▶▶ application/x-www-form-urlencoded parser ◀◀ ////
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    //// ▶▶ enable cors ◀◀ ////
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // User - Create
    app.post('/api/user/create', jsonParser, function (req, res) {
        user.createAndSave(req.body.firstName, req.body.lastName, req.body.street, req.body.city, req.body.state,
            req.body.zip, req.body.email, req.body.company, function (err, done) {
                if(err){
                    res.status=400;
                    res.send(err.toString());
                    return;
                }
                res.status=201;
                res.send(done);
        });
    });

    // User - Find One
    app.get('/api/user/findOne/:id',function(req,res){
        user.getById(req.params.id, function(err,userID){
            if (err && !ottoman.store.isNotFoundError(err)){
                res.status = 400;
                res.send(err);
                return;
            }
            if(userID){
                res.status = 202;
                res.send([userID]);
                return;
            }else{
                user.findByEmail(req.params.id,function(err,email){
                    if (err) {
                        res.status = 400;
                        res.send(err);
                        return;
                    }
                    if(email && email.length>0){
                        res.status = 202;
                        res.send(email);
                        return;
                    }else{
                        res.status = 202;
                        res.send("{not found}");
                        return;
                    }
                });
            }
        });
    });

    // Company - Create
    app.post('/api/company/create',jsonParser,function(req,res){
        company.createAndSave(req.body.name,req.body.street, req.body.city, req.body.state,
            req.body.zip,req.body.phone,req.body.website,function(err,done){
                if(err){
                    res.status=400;
                    res.send(err.toString());
                    return;
                }
                res.status=201;
                res.send(done);
            });
    });

    // Company - Find One
    app.get('/api/company/findOne/:id',function(req,res){
        company.getById(req.params.id, function(err,companyID){
            if (err && !ottoman.store.isNotFoundError(err)){
                res.status = 400;
                res.send(err);
                return;
            }
            if(companyID){
                res.status = 202;
                res.send([companyID]);
                return;
            }else{
                company.findByCompanyName(req.params.id,function(err,companyName){
                    if (err) {
                        res.status = 400;
                        res.send(err);
                        return;
                    }
                    if(companyName && companyName.length>0){
                        res.status = 202;
                        res.send(companyName);
                        return;
                    }else{
                        res.status = 202;
                        res.send("{not found}");
                        return;
                    }
                });
            }
        });
    });
}

