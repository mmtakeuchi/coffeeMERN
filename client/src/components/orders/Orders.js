import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions/orderActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    boxSizing: "border-box",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  order: {
    width: "80%",
    border: "0.5px solid gray",
    margin: "10px",
  },
  table: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    margin: "5px",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    fontSize: "1.15em",
    borderBottom: "0.5px solid gray",
    margin: "5px",
  },
  orderDate: {
    flex: "50%",
  },
  price: {
    flex: "50%",
  },
  image: {
    height: "90px",
    width: "80px",
    flex: "10%",
    margin: "5px 15px 5px 5px",
  },
  title: {
    flex: "80%",
    fontSize: "1.5em",
  },
  link: {
    textDecoration: "none",
  },
  quantity: {
    fontSize: "1.1em",
    flex: "10%",
    marginRight: "10px",
  },
});

const Orders = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const current = useSelector((state) => state.session);
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders(current.user.id));
  }, [current.user.id]);

  const renderDate = (date) => {
    if (orders) {
      let day = date.split("T")[0];
      day = new Date(day);
      day = day.toString().split(" ");

      return `${day.slice(1, 3).join(" ")}, ${day[3]}`;
    }
  };

  return (
    <div>
      {current.isAuthenticated ? (
        <React.Fragment>
          {orders.orders !== [] ? null : (
            <div color="info" className="text-center">
              You have no orders!
            </div>
          )}
        </React.Fragment>
      ) : (
        <div color="danger" className="text-center">
          Login to View!
        </div>
      )}

      {current.isAuthenticated && orders.orders.length ? (
        <div className={classes.root}>
          {orders.orders.map((order, i) => (
            <div className={classes.order}>
              <div className={classes.top}>
                <div className={classes.orderDate}>
                  <strong>Order Date: </strong>
                  {renderDate(order.date_added)}
                </div>
                <div className={classes.price}>
                  <strong>Total: </strong>${order.totalPrice}
                </div>
              </div>
              <div key={i} className={classes.table}>
                {order.products.map((product, i) => (
                  <div key={i} className={classes.details}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={classes.image}
                    />

                    <h3 className={classes.title}>
                      <Link
                        to={`/products/${product.product}`}
                        className={classes.link}
                      >
                        {product.title}
                      </Link>
                    </h3>
                    <h4 className={classes.quantity}>
                      Qty: {product.quantity}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
