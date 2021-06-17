import StripeCheckout from "react-stripe-checkout";
const STRIPE_PUBLISHABLE =
  "pk_test_51Iy6ZlBVCIFtiE59S1pQwAkGDwtEhzZnnLc2XPKBE6Tg82zntWRR1oYKMczd3s3MqIp2zHJuOSEy01O3AiBZZd1N00M5LRLv5w";

const onToken = (user, checkout) => (token) => checkout(user, token.id);

const Checkout = ({ amount, user, checkout }) => {
  return (
    <StripeCheckout
      amount={amount * 100}
      token={onToken(user, checkout)}
      currency="USD"
      stripeKey={STRIPE_PUBLISHABLE}
    />
  );
};

export default Checkout;
