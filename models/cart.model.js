var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    sessionId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
        { 
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            qty:{type:Number},
            price:{type:Number}
     }
    ],
    totalPrice: { type: Number, default: 0 },
    cartStatus: { type: Boolean, default: false }, //true if cart added to order and sucessfull
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);