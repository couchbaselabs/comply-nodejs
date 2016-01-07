var db = require('./../db.js');
var ottoman = require('ottoman');
var validator = require('./validators.js');

var ProjectMdl = ottoman.model('Project', {
    createdON: {type: 'Date', default:function(){return new Date()}},
    name:'string',
    owner:{ref:'User'},
    users:[{ref:'User'}],
    tasks:[{ref:'Tasks'}],
    status:'string'
},{
    index: {
        findByName: {
            by: 'name',
            type: 'n1ql'
        },
        findByStatus: {
            by: 'status',
            type: 'n1ql'
        },
        findByOwner:{
            by:'owner',
            type: 'n1ql'
        }
    }
});

ProjectMdl.createAndSave = function(name, owner, status, done){
    this.create({
        name: name,
        owner: owner,
        status: status
    }, done);
};

module.exports=ProjectMdl;



