/**
 * Created by tushar on 27/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requirementSchema = Schema({
    oid: String,
    requirement: {
        product: [{ pid: String,count: Number }]
    }
},{collection: 'OrphanageRequirement'});

module.exports = mongoose.model('OrphanageRequirement', requirementSchema);
