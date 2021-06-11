import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/session/Signup";
import Login from "./components/session/Login";
import Products from "./components/products/Products";
import { CssBaseline, Container } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/products" component={Products} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
