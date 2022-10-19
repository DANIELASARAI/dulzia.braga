import Stripe from "stripe";
//1) Set Up server
//A) Stripe libraries
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(req, res) {
  const { items } = req.body;

  // B) Create a PaymentIntent with the order amount and currency. Then, go to client and create checkout.js
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",

    //C) Configure payment methods
    payment_method_types: ["card", "paypal"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
