/**
 * Created by tushar on 26/5/16.
 */
var express = require('express');
var router = express.Router();

var counter=require('./orphanagecounter');
var product=require('./ProductTableModel')
function formatUserId(prodid) {
    var prodId=("0000"+prodid).slice(-4);
    prodId="PR"+prodId;
    return prodId;
}

function createNewProduct(Json,prodid,response) {
    productId=formatUserId(prodid);
    var newProduct= new product({
        _id: productId,
        name: Json.name,
        category:Json.category,
        price_range:Json.pricerange,
        priority:Json.priority

    });
    newProduct.save();

    response.json({
        name: Json.name,
        pid : productId
    });
}
function saveProductToTable(Json, response) {
    counter.findOneAndUpdate({type: "product" }, { $inc: { count: 1 }}, function (err, product) {
        if (err) {
            console.log(err);
        }
        else {
            createNewProduct(Json,product.count,response);
        }});
}
router.post('/',function(request, response){
    var Json=request.body;
    console.log(Json);
    saveProductToTable(Json,response);
});
module.exports = router;