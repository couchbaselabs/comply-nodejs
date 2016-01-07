var db = require('./../db.js');
var ottoman = require('ottoman');
var validator = require('./validators.js');
var CompanyMdl = require('./company.js');

var UserMdl = ottoman.model('User', {
    createdON: {type: 'Date', default:function(){return new Date()}},
    name:{
        first:'string',
        last:'string'},
    address:{
        street:'string',
        city:'string',
        state:'string',
        zip:'integer',
        country:{type:'string',default:'USA'}},
    phone:{type:'string',validator: validator.PhoneValidator},
    email:'string',
    password:'string',
    company:{ref:'Company'},
    active:{type:'boolean',default:true}
},{
    index: {
        findByEmail: {
            by: 'email',
            type: 'refdoc'
        },
        findByLastName: {
            by: 'name.last',
            type: 'n1ql'
        },
        findByCompany:{
            by:'company',
            type: 'n1ql'
        }
    }
});

UserMdl.createAndSave = function(firstname, lastname, addrStreet, addrCity, addrState, addrZip, email, company, done){
    this.create({
        name: {first: firstname, last: lastname},
        address: {street: addrStreet, city: addrCity, state: addrState, zip: addrZip},
        email: email,
        company: CompanyMdl.ref(company)
    }, done);
};

module.exports=UserMdl;
