/**
 * Created by tushar on 21/4/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = mongoose.Schema({
    UUID: String,
    mobile: String,
    otp: Number,
    status: String,
    token: String
},{collection: 'UserList'});

module.exports = mongoose.model('UserList', userSchema);