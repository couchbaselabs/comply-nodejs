var db = require('./../db.js');
var ottoman = require('ottoman');
var validator = require('./validators.js');

var CompanyMdl = ottoman.model('Company', {
    createdON: {type: 'Date', default:new Date()},
    name:'string',
    address:{
        street:'string',
        city:'string',
        state:'string',
        zip:'integer',
        country:{type:'string',default:'USA'}},
    phone:{type:'string',validator: validator.PhoneValidator},
    website:'string',
    active:{type:'boolean',default:true}
},{
    index: {
        findByCompanyName: {
            by: 'name',
            type: 'refdoc'
        }
    }
});

CompanyMdl.createAndSave = function (name, street,city,state,zip, phone, website, done) {
    this.create({
        name: name,
        address: {street: street, city: city, state: state, zip: zip},
        phone: phone,
        website: website
    }, done);
};

module.exports=CompanyMdl;