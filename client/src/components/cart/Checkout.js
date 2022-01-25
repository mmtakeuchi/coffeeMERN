import StripeCheckout from "react-stripe-checkout";
const STRIPE_PUBLISHABLE =
  "pk_test_51K36fyERnHV6ioLYNDKrtH56Gy3LOEtGvEV3Ys1nws98QbWv5XIuNb8dtgeQi1FiKuO7jtZhQmPniZVvCtat6rNw00yv7IHIGv";

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
