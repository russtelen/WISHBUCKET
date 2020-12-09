// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Wishlists from "./Wishlists";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/wishlist" component={Wishlists} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
