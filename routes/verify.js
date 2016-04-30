/**
 * Created by tushar on 21/4/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var assert = require('assert');
var mongodbUri = 'mongodb://tushargupta7:jerrymouse@ds015720.mlab.com:15720/helpinghand';
mongoose.createConnection(mongodbUri);
var jwt = require('jwt-simple');
//mongoose.connect(mongodbUri);
var db=mongoose.connection;
var app=express();
app.set('jwtTokenSecret', 'hello');
//var db = mongoose.createConnection(mongodbUri);
/*var userSchema = mongoose.Schema({
    UUID: String,
    mobile: String,
    otp: Number,
    status: String,
    token: String
},{collection: 'UserList'});*/

var user = require('./model.js');
db.on('error', console.error.bind(console, 'connection error:'));
//var url = 'mongodb://localhost:27017/test';
/*
MongoClient.connect(mongodbUri, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    findRestaurants(db, function() {
        db.close();
    });
});
*/
var queryBooks = function(){
    //Now querying those books which have less than 100 pages
    //Find API takes in a query condition, attributes in the document to be projected,
    //callback to be executed when the data is available.
    try{
        user.findOne({ 'mobile': '798273' }, 'otp', function (err, person) {
            if (err) return handleError(err);
            console.log('%s', person.otp) // Space Ghost is a talk show host.
        })}
    catch (err){
        console.log(err.message);
    }
}
function randfunction() {
    user.find({}).execute(function(err, result){
        if ( err ) throw err;
        console.log("Find Operations: " + result.body);
    });
}
function verifyOtpFromDb(Json) {
    var otp;
    try{
        user.findOne({ 'UUID': Json.uuid }, 'otp', function (err, person) {
            if (err) return handleError(err);
            console.log('%s', person.otp) // Space Ghost is a talk show host.
            if(Json.otp == person.otp){
                console.log("success");
                return true;
            }
            else{
                console.log("failed");
                return false;
            }
        })}
    catch (err){
        console.log(err.message);
    }/*
    user.findOne({
        'UUID': Json.uuid
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (user.otp != Json.otp) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });*/
}
/*var findRestaurants = function(db, callback) {
    var cursor =db.collection('UserList').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};*/

function generateJsonWithToken(success) {

}
router.post('/',function(request, response){
    var Json=request.body;
    console.log(Json);
    try{
        user.findOne({ 'UUID': Json.uuid }, 'otp', function (err, person) {
            if (err) return handleError(err);
            console.log('%s', person.otp) // Space Ghost is a talk show host.
            if(Json.otp == person.otp){
                console.log("success");
               // var expires = moment().add('days', 7).valueOf();
                var token = jwt.encode({
                    iss: Json.uuid,
                }, app.get('jwtTokenSecret'));
                user.update({'UUID': Json.uuid}, {'token': token, 'status': 'verified'},function (err, person) {
                    if(err) return handleError(err);
                    else {
                        console.log("update successfull");
                    }
                })
                response.json({
                    uuid : Json.uuid,
                    token: token,
                    status: 'verified'
                });
            }
            else{
                console.log("failed");
                return false;
            }
        })}
    catch (err){
        console.log(err.message);
    }
    /*var success= verifyOtpFromDb(Json);
    var text=generateJsonWithToken(success);*/
});
module.exports = router;