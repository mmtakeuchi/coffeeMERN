import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/session/Signup";
import Login from "./components/session/Login";
import Products from "./components/products/Products";
import ProductDetail from "./components/products/ProductDetail";
import NewProduct from "./components/products/NewProduct";
import UpdateProduct from "./components/products/UpdateProduct";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Footer from "./components/Footer";
import { CssBaseline, Container } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/products" component={Products} />
          <Route exact path="/products/new" component={NewProduct} />
          <Route path="/products/:id/update" component={UpdateProduct} />
          <Route path="/products/:id" component={ProductDetail} />

          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
