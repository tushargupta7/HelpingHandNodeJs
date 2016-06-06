/**
 * Created by tushar on 22/5/16.
 */
var express = require('express');
var router = express.Router();
var orphanageProd=require('./OrphanageRequirementModel');
var productDetails=require('./ProductTableModel');
var reqArr= ["bag","shoes","box","bottle"];
var newProductArray=new Array();
var prodCountArray=new Array();
function getAndAddNameToArray(product, callback, length, response) {
    productDetails.findOne({'_id': product.pid},{}, function (err, prodDetail) {
        if (err) {
            callback(length,prodDetail);
        }
        else {
            callback(product,length,prodDetail,response);
        }});
}

function func1(product,len,name,response) {
    if(len>newProductArray.length){
        newProductArray.push(name);
        prodCountArray.push(product.count);
    }
    if(len==newProductArray.length){
        var requirement = {
            product: []
        };
        for(var i in newProductArray) {

            var item = newProductArray[i];

            requirement.product.push({
                "name" : item.name,
                "pid" : item._id,
                "category" : item.category,
                "count" : prodCountArray[i]
            });
        }
     response.json(requirement);
    }
}

function sendProductList(orphanageDetail, response) {
    var productsData = orphanageDetail["product"];
    for(var i=0;i<productsData.length;i++){
        var product=productsData[i];
        getAndAddNameToArray(product,func1,productsData.length,response);
    }

}
function createRequirementJson(json,response) {
    var orphanageId=json.orphid;
    orphanageProd.findOne({'oid':orphanageId },'requirement', function (err, orphanageDetail) {
        if (err) {
            console.log(err);
        }
        else {
            sendProductList(orphanageDetail.requirement,response);
        }});
}

router.post('/',function(request, response){
    var Json=request.body;
    console.log(Json);
    createRequirementJson(Json,response);

});
module.exports = router;
