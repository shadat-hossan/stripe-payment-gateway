const express = require("express");
const stripe = require("stripe")(process.env.STRYPE_KEY);
const UserCheckoutSession = require("../models/checkout.model");

const route = express.Router();

route.post("/checkout", async (req, res) => {
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
                };
            }),
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });

        res.status(200).send({ url: session.url });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

let endpointSecret = process.env.STRIPE_WEBHOOK;

route.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        if (endpointSecret) {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log('Webhook verified.');
        } else {
            event = req.body;
        }

        const data = event.data.object;
        const eventType = event.type;

        console.log(`Received event type: ${eventType}`);
        console.log(`Event data: ${JSON.stringify(data)}`);

        switch (eventType) {
            case 'checkout.session.completed':
                const sessionData = {
                    sessionId: data.id,
                    items: data.line_items?.map(item => ({
                        name: item.description,
                        price: item.amount_total / item.quantity,
                        quantity: item.quantity,
                    })) || [],
                };

                const userCheckoutSession = new UserCheckoutSession(sessionData);
                await userCheckoutSession.save();

                console.log(`Checkout Session Completed: ${JSON.stringify(sessionData)}`);
                break;
            case 'another.event.type':
                console.log(`Other Event Data: ${JSON.stringify(data)}`);
                break;
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }

        res.send().end();
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

module.exports = route;
