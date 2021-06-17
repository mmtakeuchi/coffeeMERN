import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteFromCart } from "../../actions/cartActions";
import Checkout from "./ Checkout";
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
    minWidth: 300,
  },
}));

const Cart = (props) => {
  const [load, setLoad] = useState(false);
  const tax = 0.05;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const current = useSelector((state) => state.session);
  const userId = current.user.id;
  const classes = useStyles();
  console.log(cart.loading);
  console.log(load, cart, current);

  useEffect(() => {
    if (current.isAuthenticated && !cart.loading && !load) {
      getCartItems();
    }
  }, [cart, load]);

  const getCartItems = async () => {
    await dispatch(getCart(userId));
    setLoad(false);
  };

  const handleDelete = (userId, product) => {
    console.log("DELETE");
    dispatch(deleteFromCart(userId, product));
  };

  const handleCheckout = () => {
    console.log("checkout");
  };

  return (
    <div className={classes.root}>
      {current.isAuthenticated ? (
        <React.Fragment>
          {cart.cart ? null : <div>Your cart is empty!</div>}
        </React.Fragment>
      ) : (
        <div>Log In to View Your Cart</div>
      )}

      {current.isAuthenticated && cart.cart ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Remove</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.cart.products.map((product, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
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

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    ${parseFloat(cart.cart.bill.toFixed(2))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{tax * 100}%</TableCell>
                  <TableCell align="right">
                    ${parseFloat((cart.cart.bill * tax).toFixed(2))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    $
                    {parseFloat(cart.cart.bill.toFixed(2)) +
                      parseFloat((cart.cart.bill * tax).toFixed(2))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell rowSpan={1} />
                  <TableCell align="right">
                    <Button onClick={handleCheckout}>Checkout</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
