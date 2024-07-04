const stripe = require("stripe")(process.env.STRYPE_KEY);
const UserCheckoutSession = require("../models/checkout.model");

const checkoutCotrol = async (req, res) => {
    try {
        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "BDT",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });

        const newSession = new UserCheckoutSession({
            sessionId: session.id,
            items: req.body.items
        });

        await newSession.save();

        res.status(200).send({ url: session.url });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    checkoutCotrol
}
