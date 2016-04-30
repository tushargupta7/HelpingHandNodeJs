/**
 * Created by tushar on 6/4/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var mongodbUri = 'mongodb://tushargupta7:jerrymouse@ds015720.mlab.com:15720/helpinghand';

mongoose.createConnection(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var childSchema = mongoose.Schema({
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
},{collection: 'ChildrenList'});

var Child = mongoose.model('ChildrenList', childSchema);
function saveToMongoDb(ChildJson ) {

    for(var i=0;i<ChildJson.child.length;i++) {
        var Json=ChildJson.child[i];
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
        newChild.save();
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
}

router.post('/',function(request, response){
    var Json=request.body;
    console.log(Json);
    saveToMongoDb(Json);
});
module.exports = router;