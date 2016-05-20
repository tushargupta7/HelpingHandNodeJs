/**
 * Created by tushar on 6/4/16.
 */
var express = require('express');
var router = express.Router();


/*var childSchema = mongoose.Schema({
    name: String,
    pname: String,
    school: String,
    email: String,
    address: String,
    perfo: String,
    pincome: String,
    dob: String,
    cclass: String,
    contact: String,
    hclass: String
},{collection: 'ChildrenList'});*/

//var Child = mongoose.model('ChildrenList', childSchema);
var child=require('./child');
var childCounter=require("./orphanagecounter");
var orphanageModel=require('./orphanageSchema');

function orphanageNameById(orphanage) {
    orphanageModel.findOne({ '_id': orphanage }, 'name' , function (err, person) {
        if (err) return handleError(err);
        else return person.name;
    })
}

function formatUserId(userid) {
    var childId=("000"+userid).slice(-3);
    //orphId="OP"+orphId;
    return childId;
}

function createNewChild(Json, count, response) {
        var childid=formatUserId(count);
        var newChild = new child({
            _id: Json.orphanageid+childid,
            name: Json.name,
            dob: Json.dob,
            pname: Json.pname,
            //gender: Json.gender,
            orphanageid: Json.orphanageid,
            orphanagename: Json.orphanagename,
            email: Json.email,
            //about: Json.about,
            perfo: Json.perfo,
            pincome: Json.pincome,
            cclass: Json.class,
            hclass: Json.hclass
            //  lat: Json.latitude,
            //  lot: Json.longitude,
            //  requirements: Json.requirements,
            // fulfilled: Json.fulfilled
        });
        newChild.save();
    response.json({
        status: 'saved',
        childid: childid
    });
}

function saveToMongoDb(ChildJson ,response ) {
    for (var i = 0; i < ChildJson.child.length; i++) {
        var Json = ChildJson.child[i];
        childCounter.findOneAndUpdate({ _id : Json.orphanageid}, {$inc: {count: 1}}, function (err, orphanage) {
            if (err) {
                console.log(err);
            }
            else {
                createNewChild(Json, orphanage.count,response);
                //console.log('%s', person.seq);} // Space Ghost is a talk show host.
            }
        });
    }
}

/*
    var newChild= new Child({
        name: Json.name,
        dob: Json.dob,
        pname: Json.pname,
        //gender: Json.gender,
        school: Json.school,
        //orphanage: Json.orphanage,
        email: Json.email,
        address: Json.address,
        //about: Json.about,
        perfo: Json.perfo,
        pincome: Json.pincome,
        cclass: Json.class,
        contact: Json.contact,
        hclass: Json.hclass
      //  lat: Json.latitude,
      //  lot: Json.longitude,
      //  requirements: Json.requirements,
       // fulfilled: Json.fulfilled
    });
    newChild.save();*/


router.post('/',function(request, response){
    var Json=request.body;
    console.log(Json);
    saveToMongoDb(Json,response);
});
module.exports = router;