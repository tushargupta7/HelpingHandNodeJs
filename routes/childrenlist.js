var express = require('express');
var router = express.Router();
var child=require('./child');
var user=require('./model');
router.post('/',function (req, res, next) {
    try{
        var Json=req.body;
        user.findOne({ 'UUID': Json.uuid }, 'token', function (err, person) {
            if (err) return handleError(err);
            //console.log('%s', person.) // Space Ghost is a talk show host.
            if(Json.token == person.token) {
                console.log("success");

              /*  child.find({}, function (err, childs) {
                    if (err) return handleError(err);
                    var userMap = {};
                    var i = 0;
                    childs.forEach(function (user) {
                        userMap[i++] = user;
                    });
                    response.json();

                })*/

                child.find().lean().exec(function (err, users) {
                    var JsonString={"children" : users}
                    res.end(JSON.stringify(JsonString));
                })
            }
            else{
                console.log("failed");
                }
        })
}
    catch (err){
        console.log(err.message);
    }
});

module.exports = router;