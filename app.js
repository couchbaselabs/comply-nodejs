var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var ottoman = require("ottoman");
var path = require("path");
var config = require("./config");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Global declaration of the Couchbase server and bucket to be used
module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);
app.use("/cdn",express.static(path.join(__dirname, "cdn")));
app.use(express.static(path.join(__dirname, "public")));
//app.use("/node_modules", express.static(__dirname + "/node_modules/"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// All endpoints to be used in this application
var company = require("./routes/company.js")(app);
var user = require("./routes/user.js")(app);
var project = require("./routes/project.js")(app);
var task = require("./routes/task.js")(app);
var cdn = require("./routes/cdn.js")(app);


ottoman.bucket = module.exports.bucket;

var UserModel = require("./models/user");
var CompanyModel = require("./models/company");

ottoman.ensureIndices(function(error) {
    if(error) {
        console.log(error);
    }
    CompanyModel.findByCompanyName("Couchbase", function(error, company) {
        if(company.length < 1) {
            createDefaultCompany().then(function(result) {
                var server = app.listen(3000, function() {
                    console.log("Listening on port %s...", server.address().port);
                });
            }, function(error) {
                console.error(error);
            });
        } else {
            var server = app.listen(3000, function() {
                console.log("Listening on port %s...", server.address().port);
            });
        }
    });
});

var createDefaultCompany = function() {
    return new Promise(function(resolve, reject) {
        var company = new CompanyModel({
            name: "Couchbase",
            address: {
                street: "2440 West El Camino Real",
                city: "Mountain View",
                state: "CA",
                zip: "94040",
                country: "USA"
            },
            phone: "1234567890",
            website: "https://www.couchbase.com"
        });
        console.log(company);
        company.save(function(error) {
            if(error) {
                reject(error);
            }
            resolve(company);
        });
    });
}
