import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProduct, getProduct } from "../../actions/productActions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(2),
  },
  inputField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "65%",
  },
  imagePreview: {
    width: "180px",
    height: "200px",
  },
  imageField: {
    justifyContent: "center",
    marginRight: "-4em",
  },
  errors: {
    color: "red",
    fontSize: "18px",
  },
  input: {
    fontSize: "1.25em",
  },
  file: {
    color: "black",
    textAlign: "center",
    fontSize: "1.5em",
    marginTop: "1.5em",
  },
  button: {
    marginTop: "2em",
  },
}));

const UpdateProduct = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const productId = props.match.params.id;

  const [values, setValues] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    titleError: "",
    categoryError: "",
    descriptionError: "",
    priceError: "",
    stockError: "",
    imageError: "",
  });

  const { user } = useSelector((state) => state.session);
  const { products, errors } = useSelector((state) => state.products);

  useEffect(() => {
    if (user && !user.isAdmin) {
      history.push("/products");
    }
  }, [history, user]);

  useEffect(() => {
    if (Object.keys(products).length === 0) {
      dispatch(getProduct(productId));
    } else {
      setValues({
        title: products.title,
        category: products.category,
        description: products.description,
        price: products.price,
        stock: products.stock,
        image: products.image,
      });
    }
  }, [products]);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setValues({ ...values, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const validateInputs = () => {
    let isValid = true;

    let titleError = "";
    let descriptionError = "";
    let categoryError = "";
    let priceError = "";
    let stockError = "";
    let imageError = "";

    let title = values.title;
    let category = values.category;
    let description = values.description;
    let price = values.price;
    let stock = values.stock;
    let image = values.image;

    if (!values.title) {
      titleError = "Title can't be empty.";
    }

    if (!values.description) {
      descriptionError = "Description can't be empty.";
    }

    if (!values.category) {
      categoryError = "Category can't be empty.";
    }

    if (!values.price) {
      priceError = "Price can't be empty.";
    }

    if (!values.stock) {
      stockError = "Stock can't be empty.";
    }

    if (
      titleError ||
      descriptionError ||
      categoryError ||
      priceError ||
      stockError ||
      imageError
    ) {
      setValues({
        title,
        category,
        description,
        price,
        stock,
        image,
        titleError,
        categoryError,
        descriptionError,
        priceError,
        stockError,
        imageError,
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    let productDetails = {
      title: values.title,
      category: values.category,
      description: values.description,
      price: values.price,
      stock: values.stock,
      image: values.image,
    };
    if (validateInputs()) {
      dispatch(updateProduct(productId, productDetails));
      history.push(`/products/${productId}`);
      setValues({
        title: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <h2>Update Product</h2>

        {errors && <div className={classes.errors}>{errors}</div>}

        <form
          onSubmit={handleSubmit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                className={classes.inputField}
                error={values.titleError ? true : false}
              >
                <TextField
                  label="Title"
                  error={values.titleError ? true : null}
                  name="title"
                  aria-describedby="my-helper-text"
                  value={values.title}
                  onChange={handleInputChange}
                />

                <FormHelperText id="my-helper-text">
                  {values.titleError ? (
                    <div className={classes.errors}>{values.titleError}</div>
                  ) : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                className={classes.inputField}
                error={values.descriptionError ? true : null}
              >
                <TextField
                  label="Description"
                  error={values.descriptionError ? true : null}
                  name="description"
                  aria-describedby="my-helper-text"
                  value={values.description}
                  onChange={handleInputChange}
                />

                <FormHelperText id="my-helper-text">
                  {values.descriptionError ? (
                    <div className={classes.errors}>
                      {values.descriptionError}
                    </div>
                  ) : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                className={classes.inputField}
                error={values.categoryError ? true : false}
              >
                <TextField
                  label="Category"
                  error={values.categoryError ? true : null}
                  name="category"
                  aria-describedby="my-helper-text"
                  value={values.category}
                  onChange={handleInputChange}
                />

                <FormHelperText id="my-helper-text">
                  {values.categoryError ? (
                    <div className={classes.errors}>{values.categoryError}</div>
                  ) : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                className={classes.inputField}
                error={values.priceError ? true : null}
              >
                <TextField
                  label="Price"
                  error={values.priceError ? true : null}
                  name="price"
                  aria-describedby="my-helper-text"
                  value={values.price}
                  onChange={handleInputChange}
                />

                <FormHelperText id="my-helper-text">
                  {values.priceError ? (
                    <div className={classes.errors}>{values.priceError}</div>
                  ) : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                className={classes.inputField}
                error={values.stockError ? true : null}
              >
                <TextField
                  label="Stock"
                  error={values.stockError ? true : null}
                  name="stock"
                  aria-describedby="my-helper-text"
                  value={values.stock}
                  onChange={handleInputChange}
                />

                <FormHelperText id="my-helper-text">
                  {values.stockError ? (
                    <div className={classes.errors}>{values.stockError}</div>
                  ) : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <br />
              <FormControl
                className={classes.imageField}
                error={values.imageError ? true : null}
              >
                <label htmlFor="contained-button-file"></label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  name="image"
                  type="file"
                  onChange={handleImageUpload}
                />
                <FormHelperText id="my-helper-text">
                  {values.imageError ? (
                    <div className={classes.errors}>{values.imageError}</div>
                  ) : null}
                </FormHelperText>
              </FormControl>
              <div>
                <img
                  src={values.image}
                  alt="coffee image"
                  className={classes.imagePreview}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className={classes.button}
                startIcon={<AddCircleOutlineIcon />}
              >
                Update Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
