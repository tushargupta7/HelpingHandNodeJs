/**
 * Created by tushar on 29/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requirementSchema = Schema({
    stuId: String,
    requirement: {
        product: [{ pid: String,count: Number }]
    }
},{collection: 'OrphanageRequirement'});

module.exports = mongoose.model('OrphanageRequirement', requirementSchema);