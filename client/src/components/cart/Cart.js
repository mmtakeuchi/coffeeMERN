import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCart, deleteFromCart } from "../../actions/cartActions";
import { chargeOrder } from "../../actions/orderActions";
import { getOrders } from "../../actions/orderActions";
import Checkout from "./Checkout";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    borderBottom: "1px solid black",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  table: {
    border: "1px solid black",
    // background: "white",
    minWidth: 300,
  },
  row: {
    borderBottom: "1px solid black",
  },
  picture: {
    height: "90px",
    width: "80px",
  },
}));

const Cart = (props) => {
  const [load, setLoad] = useState(false);
  const tax = 0.05;
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const current = useSelector((state) => state.session);
  const orders = useSelector((state) => state.orders);
  const userId = current.user.id;
  const classes = useStyles();

  useEffect(() => {
    if (current.isAuthenticated && !cart.loading && !load) {
      getCartItems();
    }
  }, []);

  const getCartItems = async () => {
    await dispatch(getCart(userId));
    setLoad(false);
  };

  const handleDelete = (userId, product) => {
    dispatch(deleteFromCart(userId, product));
  };

  const handleCheckout = () => {
    if (orders.status === "success") {
      history.push("/orders");
    }
  };

  useEffect(() => handleCheckout(), [orders]);

  return (
    <div className={classes.root}>
      {current.isAuthenticated ? (
        <React.Fragment>
          {cart.cart ? null : <h2>Your cart is empty!</h2>}
        </React.Fragment>
      ) : (
        <h1>Log In to View Your Cart</h1>
      )}

      {current.isAuthenticated && cart.cart ? (
        <div>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell colSpan={2} align="right">
                    Name
                  </StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Remove</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.cart.products.map((product, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell>
                      <img
                        src={product.image}
                        alt={`${product.title}`}
                        className={classes.picture}
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {product.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {product.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      $
                      {parseFloat(
                        (product.quantity * product.price).toFixed(2)
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        onClick={handleDelete.bind(
                          this,
                          current.user.id,
                          product
                        )}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}

                <StyledTableRow>
                  <StyledTableCell rowSpan={1} />
                  <StyledTableCell colSpan={3} align="center">
                    Total
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    ${parseFloat(cart.cart.bill.toFixed(2))}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell rowSpan={1} />
                  <StyledTableCell colSpan={3} className={classes.row} />
                  <StyledTableCell align="right" className={classes.row}>
                    <Checkout
                      user={userId}
                      amount={cart?.cart?.bill}
                      checkout={props.chargeOrder}
                      onClick={handleCheckout}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </div>
  );
};

export default connect(null, { chargeOrder })(Cart);
