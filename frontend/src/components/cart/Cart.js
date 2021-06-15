import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../actions/cartActions";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Cart = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const current = useSelector((state) => state.session);
  const userId = current.user.id;
  const classes = useStyles();
  console.log(cart, current);

  useEffect(() => {
    if (current.isAuthenticated) {
      dispatch(getCart(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className={classes.root}>
      {current.isAuthenticated ? (
        <React.Fragment>
          {cart ? null : <div>Your cart is empty!</div>}
        </React.Fragment>
      ) : (
        <div>Log In to View Your Cart</div>
      )}

      {current.isAuthenticated && cart ? (
        <div>
          {cart.products.map((product, i) => (
            <div key={i}>{product.title}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
