var ottoman = require("ottoman");
var validator = require("../validators/validators.js");

ottoman.bucket = require("../app").bucket;

var ProjectMdl = ottoman.model("Project", {
        createdON: { type: "Date", default: function() { return new Date() } },
        name: "string",
        description: "string",
        owner: { ref: "User" },
        users: [{ ref: "User" }],
        tasks: [{ ref: "Task" }],
        status: "string",
        permalink:{type:"string", default: validator.permalinker}
}, {
    index: {
        findByName: {
            by: "name",
            type: "n1ql"
        },
        findByStatus: {
            by: "status",
            type: "n1ql"
        },
        findByOwner:{
            by:"owner",
            type: "n1ql"
        },
        findByLink:{
            by:"permalink",
            type: "refdoc"
        }
    }
});

module.exports=ProjectMdl;
