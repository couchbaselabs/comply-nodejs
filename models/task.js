var ottoman = require("ottoman");
var validator = require("../validators/validators.js");

ottoman.bucket = require("../app").bucket;

var TaskMdl = ottoman.model("Task", {
    createdON: { type: "Date", default: function() {return new Date() }},
    url: "string",
    name: "string",
    description: "string",
    type: "string",
    owner: {ref: "User"},
    assignedTo: {ref: "User"},
    users: [{ref: "User"}],
    priority: "string",
    status: "string",
    permalink: {type:"string", default: validator.permalinker},
    history: [
        {
            log: "string",
            photos: [{type: "string"}],
            url: "string",
            user: {ref: "User"},
            createdAt: { type: "Date", default: function() { return new Date() }}
        }
    ]
}, {
    index: {
        findByName: {
            by: "name",
            type: "n1ql"
        },
        findByType: {
            by: "type",
            type: "n1ql"
        },
        findByStatus: {
            by: "status",
            type: "n1ql"
        },
        findByPriority: {
            by: "priority",
            type: "n1ql"
        },
        findByAssignedTo:
        {
            by: "assignedTo",
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

module.exports=TaskMdl;
