require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8081;
app.use(express.json());

app.use(cors());

const stripe = require("stripe")(process.env.STRYPE_KEY)

app.post("/checkout", async (req, res)=> {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode: 'payment',
            line_items: req.body.items.map(item =>{
                return {
                    price_data:{
                        currency: "BDT",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: (item.price)*100,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        })

        res.status(200).send({url: session.url});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})


app.listen(PORT, ()=>{
    console.log(`The Server is Runing at http://localhost:${PORT}`)
})

