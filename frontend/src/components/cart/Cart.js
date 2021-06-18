import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCart, deleteFromCart } from "../../actions/cartActions";
import { chargeOrder } from "../../actions/orderActions";
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
}));

const Cart = (props) => {
  console.log(props);
  const [load, setLoad] = useState(false);
  const tax = 0.05;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const current = useSelector((state) => state.session);
  const userId = current.user.id;
  const classes = useStyles();
  console.log(cart);

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
    console.log("DELETE");
    dispatch(deleteFromCart(userId, product));
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
          <TableContainer>
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

                <StyledTableRow>
                  <StyledTableCell rowSpan={1} />
                  <StyledTableCell colSpan={2}>Subtotal</StyledTableCell>
                  <StyledTableCell align="right">
                    ${parseFloat(cart.cart.bill.toFixed(2))}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell colSpan={1} />
                  <StyledTableCell>Tax</StyledTableCell>
                  <StyledTableCell align="right">{tax * 100}%</StyledTableCell>
                  <StyledTableCell align="right">
                    ${parseFloat((cart.cart.bill * tax).toFixed(2))}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell rowSpan={1} />
                  <StyledTableCell colSpan={2}>Total</StyledTableCell>
                  <StyledTableCell align="right">
                    $
                    {parseFloat(cart.cart.bill.toFixed(2)) +
                      parseFloat((cart.cart.bill * tax).toFixed(2))}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell colSpan={3} className={classes.row} />
                  <StyledTableCell align="right" className={classes.row}>
                    <Checkout
                      user={userId}
                      amount={
                        parseFloat(cart.cart.bill.toFixed(2)) +
                        parseFloat((cart.cart.bill * tax).toFixed(2))
                      }
                      checkout={props.chargeOrder}
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
