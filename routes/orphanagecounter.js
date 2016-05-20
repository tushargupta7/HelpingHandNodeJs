/**
 * Created by tushar on 10/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var counterSchema = mongoose.Schema({
    type : String,
    count : Number,
    _id: String
},{collection: 'counters'});



module.exports = mongoose.model('counters', counterSchema );
