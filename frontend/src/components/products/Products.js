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
    console.log(this.props);
    return (
      <div>
        <div>Products</div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => this.props.history.push("/products/new")}
          style={{ margin: "10px" }}
        >
          ADD NEW PRODUCT
        </Button>

        <Grid container spacing={4}>
          {this.renderProducts()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products: products.products,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
