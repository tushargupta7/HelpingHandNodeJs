/**
 * Created by tushar on 27/5/16.
 */
var express = require('express');
var router = express.Router();
var orphanageReq=require('./OrphanageRequirementModel');

function getOrphanageReqArray(Json) {
    var jsonArray=Json.get
}
function saveOrphanageRequirement(Json, response) {
    //var ReqArray=getOrphanageReqArray(Json);
    var requirement= new orphanageReq(Json);
    requirement.save(function (err,data){
    if(err){
        console.log(err.body);
        response.json({status:"failed"});
    }
        else response.json({status:"saved"});
    }
    );
}

router.post('/',function(request, response){
    var Json=request.body;
    console.log(request.url);
    saveOrphanageRequirement(Json,response);
});
module.exports = router;