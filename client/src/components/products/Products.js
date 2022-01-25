import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Product from "./Product";
import { Grid, Button } from "@material-ui/core";

class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  renderProducts = () => {
    const { products } = this.props;

    if (products) {
      if (products.length > 0) {
        return products.map((product, i) => (
          <Grid item key={i} xs={6} sm={4}>
            <Product product={product} />
          </Grid>
        ));
      }
    }

    return <div>No Products Found.</div>;
  };

  render() {
    return (
      <div style={{ marginBottom: "2.5em" }}>
        <h1>Products</h1>
        {this.props.current?.user?.isAdmin ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.props.history.push("/products/new")}
            style={{ margin: "10px" }}
          >
            ADD NEW PRODUCT
          </Button>
        ) : null}

        <Grid container spacing={4}>
          {this.renderProducts()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  current: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
