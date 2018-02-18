var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productImgPath: { type: String, required: true },
    color: { type: String, required: true },
    existingDimensionId: { type: Schema.Types.ObjectId, ref: 'ExistingDimension' },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    price: { type: String },
    inkCoverage: { type: Number },
    material: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);

