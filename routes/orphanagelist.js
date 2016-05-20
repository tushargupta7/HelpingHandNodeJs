/**
 * Created by tushar on 14/5/16.
 */
var express = require('express');
var router = express.Router();
var orphanage=require('./orphanageSchema');

router.get('/',function (req, res, next) {
    try{
        var Json=req.body;
        orphanage.find().lean().exec(function (err, orphanageList) {
            if (err) return handleError(err);
            //console.log('%s', person.) // Space Ghost is a talk show host
                    var JsonString={"orphanage" : orphanageList}
                    res.end(JSON.stringify(JsonString));
                })
    }
    catch (err){
        console.log(err.message);
    }
});

module.exports = router;