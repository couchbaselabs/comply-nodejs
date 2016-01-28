var Hashids = require("hashids");
var config = require("./../config.json");

module.exports.phoneValidator=function(val) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(val && !val.match(phoneno)) {
        throw new Error('Phone number is invalid.');
    }
}

module.exports.permalinker=function(){
  var milliseconds = (new Date).getTime();
  var hashids = new Hashids(config.salt);
  var id = hashids.encode(milliseconds);
  return id;
}
