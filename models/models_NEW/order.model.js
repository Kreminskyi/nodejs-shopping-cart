var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: Schema.Types.ObjectId, ref: 'UserSession' },
    address: { type: String, required: true },
    name: { type: String, required: true },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            qty: { type: Number },
            price:{type:Number}
        }
    ],
    shippingPrice:{type:Number},
    totalAmount: { type: Number },
    orderStatus: { type: String, required: true }, //pending delivered cancelled
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);