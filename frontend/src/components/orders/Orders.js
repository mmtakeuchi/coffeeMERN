import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/orderActions";

const Orders = (props) => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.session);
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders(current.user.id));
  }, [current.user.id]);

  console.log(orders);
  return (
    <div>
      {current.isAuthenticated ? (
        <React.Fragment>
          {orders.orders === [] ? null : (
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
        <div>
          {orders.orders.map((products) => (
            <div>{products.title}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
