import React from "react";
import { render } from "react-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import App from "./components/App/App";

import "./styles/styles.scss";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UsersTable from "./components/Home/Table/UsersTable";
import Password from "./components/Password/Password";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Dashbord from "./components/dashbord/Dashbord";
import AddUser from "./components/Home/Table/AddUser";
import profile from "./components/Profile/profile";
import EditUser from "./components/Home/Table/EditUser";
import customers from "./components/customers/customers";
import customersTable from "./components/customers/customersTable";
import EditCustomer from "./components/customers/EditCustomer";
import groupes from "./components/groupes/groupes";
import Transaction from "./components/transaction/Transaction";
import customersDetails from "./components/customers/customersDetails";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/register" component={Register} />
        <Route path="/password" component={Password} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/dashbord" component={Dashbord} />
          <PrivateRoute path="/usersliste" component={UsersTable} />
          <PrivateRoute path="/edituser/:id" component={EditUser} />
          <PrivateRoute path="/editcustomer/:id" component={EditCustomer} />
          <PrivateRoute path="/profile" component={profile} />
          <PrivateRoute path="/add-customers" component={customers} />
          <PrivateRoute path="/customersTable" component={customersTable} />
          <PrivateRoute path="/Transactions-liste" component={Transaction} />
          <PrivateRoute
            path="/customersDetails/:id"
            component={customersDetails}
          />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById("app")
);
