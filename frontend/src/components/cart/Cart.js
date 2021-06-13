import React, { Component } from "react";
import { connect } from "react-redux";

export class Cart extends Component {
  render() {
    console.log(this);
    return <div>Cart</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
