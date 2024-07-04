const express = require("express");
const stripe = require("stripe")(process.env.STRYPE_KEY);
const UserCheckoutSession = require("../models/checkout.model");
const bodyParser = require("body-parser");

const route = express.Router();

// Middleware to parse raw request body for webhooks
route.post('/webhook', bodyParser.raw({ type: 'application/json' }));

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

const endpointSecret = process.env.STRIPE_WEBHOOK;

route.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        let event;

        if (!endpointSecret) {
            throw new Error('Stripe webhook secret not configured.');
        }

        // Use the raw body instead of parsed body
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        console.log('Webhook verified.');

        const data = event.data.object;
        const eventType = event.type;

        console.log(`Received event type: ${eventType}`);
        console.log(`Event data: ${JSON.stringify(data)}`);

        switch (eventType) {
            case 'checkout.session.completed':
                const session = await stripe.checkout.sessions.retrieve(data.id, {
                    expand: ['line_items'],
                });

                const sessionData = {
                    sessionId: session.id,
                    items: session.line_items.data.map(item => ({
                        name: item.description,
                        price: item.amount_subtotal / item.quantity,
                        quantity: item.quantity,
                    })),
                };

                const userCheckoutSession = new UserCheckoutSession(sessionData);
                await userCheckoutSession.save();

                console.log(`Checkout Session Completed: ${JSON.stringify(sessionData)}`);
                break;
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }

        res.send().end();
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

module.exports = route;
