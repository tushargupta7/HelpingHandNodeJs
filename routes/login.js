/**
 * Created by tushar on 10/4/16.
 */
require("google-closure-library");
var express = require('express');
var router = express.Router();
var phoneUtil = require('google-libphonenumber');
var PNF = require('google-libphonenumber').PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var phoneNumber = phoneUtil.parse('202-456-1414', 'IN');
console.log(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
/*var mobnumber=mongoose.Schema({
    number :
});*/

/*
var userSchema = mongoose.Schema({
    UUID: String
},{collection: 'UserList'});
*/

//var user = mongoose.model('UserList', userSchema);
var user = require('./model.js');
function saveToMongoDb(Json ) {
    var otp= Math.floor(Math.random()*90000) + 10000;
    var uuid= guid();
    var newUser= new user({
        UUID: "uuid",
        mobile: Json.mobile,
        otp: otp,
        status: 'unverified',
        token: 'null'
    });
    newUser.save();

    var text = '{ UUID : '+ uuid +
        ', otp : ' + otp +
        ', mobile : '+ Json.mobile +
        ', status : unverified '+
        ', accessToken: null,'+
        ', otpexpired : false}';
    return text;
}

function saveNumberToMongoDb(Json) {
    var otp= Math.floor(Math.random()*90000) + 10000;
    var uuid= guid();
    console.log(mongoose.connection.readyState);
    var newUser= new user({
        UUID: uuid,
        mobile: Json.mobile,
        otp: otp,
        status: "unverified",
        token: "null"
    });
    newUser.save();
    var text = '{ "UUID" : "'+ uuid +
        '", "otp" : ' + otp +
        ', "mobile" : "'+ Json.mobile +
        '", "status" : "unverified" '+
        ', "token": "null" '+
        ', "otpexpired" : "false"}';
    return text;
}
router.post('/',function(request, response){
    var Json=request.body;
    console.log(Json);
   // var otp= Math.floor(Math.random()*90000) + 10000;
    var jsonText=saveNumberToMongoDb(Json);
    //var obj = JSON.parse(jsonText);
   // response.setHeader('Content-Type', 'application/json');
    response.json(JSON.parse(jsonText));
});

function sendNumberVerification(Json){


}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
module.exports = router;