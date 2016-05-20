/**
 * Created by tushar on 1/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var childSchema = mongoose.Schema({
    _id: String,
    name: String,
    pname: String,
    email: String,
    perfo: String,
    pincome: String,
    orphanageid: String,
    orphanagename: String,
    dob: String,
    cclass: String,
    hclass: String
},{collection: 'ChildrenList'});


module.exports = mongoose.model('ChildrenList', childSchema);