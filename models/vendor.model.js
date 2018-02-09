var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendorSchema = new Schema({
    vendorName: { type: String, required: true },
    address: { type: String, required: true }
});

module.exports = mongoose.model('Vendor', VendorSchema);