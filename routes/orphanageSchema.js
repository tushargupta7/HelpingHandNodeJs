/**
 * Created by tushar on 9/5/16.
 */
/**
 * Created by tushar on 1/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var orphanage = mongoose.Schema({
    _id: String,
    name: String,
    address1: String,
    address2: String,
    pincode: String,
    contact: String,
    count: String
},{collection: 'OrphanageList'});


module.exports = mongoose.model('OrphanageList', orphanage);