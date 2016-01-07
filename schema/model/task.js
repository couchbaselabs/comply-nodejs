var db = require('./../db.js');
var ottoman = require('ottoman');
var validator = require('./validators.js');

var TaskMdl = ottoman.model('Task', {
    createdON: {type: 'Date', default:function(){return new Date()}},
    url:'string',
    name:'string',
    type:'string',
    owner:{ref:'User'},
    assignedTo:{ref:'User'},
    users:[{ref:'User'}],
    priority:'string',
    status:'string',
    history:[{
        log:'string',
        photos:[{type:'string'}],
        url:'string',
        user:{ref:'User'}
    }]
},{
    index: {
        findByName: {
            by: 'name',
            type: 'n1ql'
        },
        findByType: {
            by: 'type',
            type: 'n1ql'
        },
        findByStatus: {
            by: 'status',
            type: 'n1ql'
        },
        findByPriority: {
            by: 'priority',
            type: 'n1ql'
        },
        findByAssignedTo:
        {
            by: 'assignedTo',
            type: 'n1ql'
        },
        findByOwner:{
            by:'owner',
            type: 'n1ql'
        }
    }
});

TaskMdl.createAndSave = function(name, owner, assignedTo, type, priority, status, url, done){
    this.create({
        name: name,
        type: type,
        owner: owner,
        priority: priority,
        status: status,
        url: url,
        assignedTo: assignedTo
    }, done);
};

module.exports=TaskMdl;



