
module.exports.phoneValidator=function(val) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(val && !val.match(phoneno)) {
        throw new Error('Phone number is invalid.');
    }
}