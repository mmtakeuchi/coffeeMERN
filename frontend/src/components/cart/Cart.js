import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteFromCart } from "../../actions/cartActions";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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
  }, []);

  const handleDelete = (userId, product) => {
    console.log("DELETE");
    console.log(userId, product);
    dispatch(deleteFromCart(userId, product));
  };

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
            <div key={i}>
              <span>{product.title}</span>
              <Button
                onClick={handleDelete.bind(this, current.user.id, product)}
              >
                Delete
              </Button>
            </div>
          ))}
          Total: {cart.bill}
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
