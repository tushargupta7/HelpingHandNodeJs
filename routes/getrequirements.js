/**
 * Created by tushar on 22/5/16.
 */
var express = require('express');
var router = express.Router();

var reqArr= ["bag","shoes","box","bottle"];
function createRequirementJson() {
    var a=JSON.stringify(reqArr);
     var json='{"requirements":'+a+'}';
     return json;
}
router.get('/',function(request, response){
    var Json=request.body;
    console.log(Json);
    var json=createRequirementJson();
    response.json(JSON.parse(json));
});
module.exports = router;
