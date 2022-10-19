import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import Shipping from "./prebuilt/Shipping";
import AddressForm from "./prebuilt/AddressForm";

export default function CheckoutForm() {
  /* 2.5) Store a reference to Stripe. Access the Stripe library in your CheckoutForm component 
    by using the useStripe() and useElements() hooks.  */
  const stripe = useStripe();
  const elements = useElements();
  /*2.4) Set up the state settings
Initialize some state to keep track of the payment, 
show errors, and manage the user interface. */
  const [email, setEmail] = React.useState(""); //2.11 Add email to the state
  const [nif, setNif] = React.useState(""); //2.11 Add nif to the state
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    /* 2.10) Show a payment status message. When Stripe redirects the customer to the return_url,
     the payment_intent_client_secret query parameter is appended by Stripe.js. 
    Use this to retrieve the PaymentIntent to determine what to show to your customer.*/
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    /* 2.8) Complete the payment. When your customer clicks the pay button, 
    call confirmPayment() with the PaymentElement and pass a return_url to indicate 
    where Stripe should redirect the user after they complete the payment. */

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
        //2.12 Provide the email address to Stripe
        receipt_email: email,
      },
    });

    // 2.9) This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* 2.10//Stripe can send an email receipt to your customer using your brand logo and color theme,
       which are configurable in the Dashboard. 
       Collect the customer’s email address. 
       Add an input field to your payment form to collect the email address.*/}
      {/*    <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      /> */}
      <LinkAuthenticationElement />

      <AddressForm />
      {/*  <h4>Detalhes de envio</h4>
      <Shipping /> */}
      {/* 2.6) Add the custom elements forms */}
      <h4>Metodos do pagamento</h4>
      <PaymentElement id="payment-element" />

      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
