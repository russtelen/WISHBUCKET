// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Wishlists from "./Wishlists";
import Wishlist from "./wishlist/Wishlist";
import Register from "./auth/Register";
import Login from "./auth/Login";
import React, {useState, useEffect} from 'react';
import { UserAuthContext } from './UserAuthContext';
import Footer from "./Footer";

export default function App() {
  
  // state variable to track whether User is logged-in;
  // -- passed to any other Components via UserAuthContext
  const [userAuthenticated, setUserAuthenticated] = useState("");
  // const [userLoggedInEmail, setUserLoggedInEmail] = useState("");
  // update the state variable based on SessionStorage AT RENDER
  useEffect(() => {
    if(sessionStorage.getItem("bearer-token") == null) {
      setUserAuthenticated("");
    } else {
      setUserAuthenticated(sessionStorage.getItem("loggedIn-email"));
    }
  }, [])
  // update the state variable based on SessionStorage WHEN CALLED 
  //  -- i.e. at Login-Button-onClick, Logout-Button-onClick
  const updateUserAuthenticated = () => {
    if(sessionStorage.getItem("bearer-token") === "") {
      setUserAuthenticated("");

    } else {
      setUserAuthenticated(sessionStorage.getItem("loggedIn-email"));
    }    
  }

  const userAuthValue = {
    userAuthenticated: userAuthenticated,
    updateUserAuthenticated: updateUserAuthenticated,
  }

  return (
    <div className="App">
      <UserAuthContext.Provider value={userAuthValue}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/wishlist" component={Wishlists} />
              <Route exact path="/wishlist/:id" component={Wishlist} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </UserAuthContext.Provider>
    </div>
  );
}
