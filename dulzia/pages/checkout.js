//2) Add Stripe to your React app
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
// 2.1)Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  {
    betas: ["address_element_beta_1"],
  }
);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  //2.2) Fetch a PaymentIntent.  make a request to the endpoint on your server to create a new PaymentIntent as soon as your checkout page loads. The clientSecret returned by your endpoint is used to complete the payment.

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  /* 2.7)) Come back from Checkout Form to style the elements appereance */
  const appearance = {
    theme: "flat",
    variables: {
      fontWeightNormal: "500",
      borderRadius: "2px",
      colorBackground: "white",
      colorPrimary: "#DF1B41",
      colorPrimaryText: "white",
      spacingGridRow: "15px",
    },
    labels: "floating",
    rules: {
      ".Label": {
        marginBottom: "6px",
      },
      ".Tab, .Input, .Block": {
        boxShadow: "0px 3px 10px rgba(18, 42, 66, 0.08)",
        padding: "12px",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    //2.3)Initialize Stripe Elements. Go and create a Checkout form component.
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
