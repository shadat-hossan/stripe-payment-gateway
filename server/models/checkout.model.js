const mongoose = require('mongoose');

const checkoutSessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
},
{
    timestamps: true
}
);

const CheckoutSession = mongoose.model('UserCheckoutSession', checkoutSessionSchema);

module.exports = CheckoutSession;
