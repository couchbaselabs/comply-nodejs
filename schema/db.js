// Instantiate Couchbase and Ottoman
var couchbase=require('couchbase');
var ottoman=require('ottoman');

// Build my cluster object and open a new cluster
var myCluster = new couchbase.Cluster('localhost:8091');
var myBucket = myCluster.openBucket('comply');
ottoman.bucket=myBucket;

// Build my "schema" from my model files
require('./model/company');
require('./model/user');
require('./model/project');
require('./model/task');

// Build the necessary indexes to function
ottoman.ensureIndices(function(err,done){
    if(err){
        console.log("Error:Ensure Indices",err);
    }
    if(done){
        console.log("Ensured Indexes:",done);
    }
});