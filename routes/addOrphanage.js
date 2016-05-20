/**
 * Created by tushar on 9/5/16.
 */
var express = require('express');
var router = express.Router();

var orphanage=require('./orphanageSchema');
var counter=require('./orphanagecounter');

function formatUserId(userid) {
  var orphId=("000"+userid).slice(-3);
    orphId="OP"+orphId;
    return orphId;
}

function createNewOrphanage(Json,userid,response) {
    userid=formatUserId(userid);
    var newOrphanage= new orphanage({
        _id: userid,
        name: Json.name,
        address1: Json.address1,
        address2: Json.address2,
        pincode: Json.pincode,
        contact: Json.contact,
        count: 1
    });
    newOrphanage.save();

    var orphanEntry = new counter({
        type: "children",
        _id: userid,
        count: 0
    });
    orphanEntry.save();

    response.json({
        name: Json.name,
        oid : userid
    });
}

/*counter.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};*/

function sendOrphanageDetailsToDb(Json, name,response) {

    counter.findOneAndUpdate({type: name }, { $inc: { count: 1 }}, function (err, person) {
        if (err) {
            console.log(err);
        }
        else {
            createNewOrphanage(Json,person.count,response);
        //console.log('%s', person.seq);} // Space Ghost is a talk show host.
    }});

}



router.post('/',function(request, response){
    var Json=request.body;
    console.log(Json);
    sendOrphanageDetailsToDb(Json,"orphanage",response);
});

module.exports = router;