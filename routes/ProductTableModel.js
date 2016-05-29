/**
 * Created by tushar on 26/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requirementSchema = mongoose.Schema({
    _id: String,
    name: String,
    category: String,
    price_range: String,
    priority: String
},{collection: 'productlist'});

module.exports = mongoose.model('productlist', requirementSchema);
