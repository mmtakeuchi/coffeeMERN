import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import Product from "./Product";

class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  renderProducts = () => {
    return (
      this.props.products &&
      this.props.products.map((product, i) => (
        <div key={i}>
          <Product product={product} />
        </div>
      ))
    );
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div>Products</div>
        <div>{this.renderProducts()}</div>
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
