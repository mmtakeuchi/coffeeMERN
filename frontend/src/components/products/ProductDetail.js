import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProduct, deleteProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField, Grid } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: "black",
    // color: theme.palette.text.secondary,
  },
  image: {
    // width: "90%",
    // height: "50vh",
    // objectFit: "cover",
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  title: {
    fontSize: "40px",
    marginBottom: "0px",
  },
  quantity: {
    width: "6em",
    textAlign: "left",
    marginBottom: "1em",
  },
  button: {
    background: "orange",
  },
  error: {
    color: "red",
    marginBottom: "1em",
  },
}));

const ProductDetail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = props.match.params.id;
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState("");
  const product = useSelector((state) => state.products.products);
  const current = useSelector((state) => state.session);
  console.log(product, current);

  useEffect(() => dispatch(getProduct(productId)), [dispatch, productId]);
  console.log(props);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const validateQuantity = () => {
    let valid = true;
    console.log(quantity);

    if (quantity === "" || quantity <= 0) {
      setError("Please enter a valid amount.");
      valid = false;
    } else if (quantity > product.stock) {
      setError(
        `Quantity is currently above the products stock. There are only ${product.stock} avaliable right now.`
      );
      valid = false;
    }

    return valid;
  };

  const handleAddClick = () => {
    console.log(validateQuantity(quantity));
    if (validateQuantity(quantity)) {
      if (!current.isAuthenticated) {
        console.log("Sign In to Add Item to Cart.");
      } else {
        dispatch(addToCart(current.user.id, product._id, quantity));
        history.push(`/cart`);
      }
    } else {
      return;
    }
  };

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    history.push("/products");
  };

  return (
    <React.Fragment>
      {product && (
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={classes.image}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Button
                  onClick={() =>
                    history.push(`/products/${product._id}/update`)
                  }
                >
                  Update
                </Button>
                <Button onClick={handleDelete}>Delete</Button>
                <h1 className={classes.title}>{product.title}</h1>
                <h3>
                  {product.category
                    ? `Roast: ${product.category.toUpperCase()}`
                    : null}
                </h3>
                <div>{product.description}</div>
                <body1>{product.price}</body1>
                <br />
                <br />
                {error && <div className={classes.error}>{error}</div>}
                <TextField
                  className={classes.quantity}
                  id="quantity"
                  label="Quantity"
                  variant="outlined"
                  size="small"
                  value={quantity}
                  onChange={handleChange}
                />
                <br />
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleAddClick}
                >
                  ADD TO CART
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
