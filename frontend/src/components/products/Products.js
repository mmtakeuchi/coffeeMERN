import React from "react";
import { connect } from "react-redux";

export const Products = (props) => {
  return <div>Products</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
