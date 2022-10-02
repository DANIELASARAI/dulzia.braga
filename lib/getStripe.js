import { loadStripe } from "@stripe/stripe-js";

/* 2)) Load Stripe.js


Stripe Checkout relies on Stripe.js, Stripe’s foundational JavaScript library for collecting sensitive payment information 
with advanced fraud detection. Call loadStripe with your publishable API key.
It returns a Promise that resolves with the Stripe object as soon as Stripe.js loads. 3) Go to Cart.jsx file*/

const getStripe = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  return stripePromise;
};

export default getStripe;
