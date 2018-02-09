var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExistingDimensionSchema = new Schema({
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    styleOfBox: { type: String },
    fluteSize: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExistingDimension', ExistingDimensionSchema);