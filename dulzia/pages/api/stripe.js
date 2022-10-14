import Stripe from "stripe";
//1) Set Up server
//A) Stripe libraries
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
////////////////////////////////////////////////////////////////////////

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      /*  A) Create Checkout Sessions from body params. Add an endpoint on your server that creates a Checkout Session.
         A Checkout Session controls what your customer sees on the payment page such as line items, 
        the order amount and currency, and acceptable payment methods. 
        We enable cards and other common payment methods for you by default, 
        and you can enable or disable payment methods directly in the Stripe Dashboard. */
      const params = {
        submit_type: "pay",
        /*  D) Choose the mode. Checkout has three modes: payment, subscription, or setup. 
        Use payment mode for one-time purchases.  */
        mode: "payment", //For payment mode, there is a maximum of 100 line items, however it is recommended to consolidate line items if there are more than a few dozen.
        payment_method_types: ["card", "eps", "ideal"], //A list of the types of payment methods (e.g., card) this Checkout Session can accept.
        billing_address_collection: "required", // ''auto' Checkout will only collect the billing address when necessary.
        shipping_options: [{ shipping_rate: "shr_1LsqnWHjmPVeHab7wyM2TU6y" }],
        locale: "pt",
        customer_creation: "always",
        tax_id_collection: {
          enabled: true,
        },

        phone_number_collection: {
          enabled: true,
        },
        /* C) Products to sell. A list of items the customer is purchasing. Use this parameter to pass one-time or recurring Prices. */
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/zjwhm3mt/production/"
            )
            .replace("-webp", ".webp", "jpeg", "jpg");

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },

            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        /* E) Supply success and cancel URLs settings
        Specify URLs for success and cancel pages—make sure they’re publicly accessible so Stripe can redirect customers to them.
        You can also handle both the success and canceled states with the same URL. Then, build your order preview page =>>> 2) Continue on getStripe.js...*/
        success_url: `${req.headers.origin}/success`, //The URL to which Stripe should send customers when payment or setup is complete.
        cancel_url: `${req.headers.origin}/`,
      };

      // B) Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      console.log("Checkout Session Completed for: ", session);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
