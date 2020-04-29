import React, { Component } from "react";
import "whatwg-fetch";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import validateLoginInput from "../../../../server/validation/Login";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onTextboxChangeemail = this.onTextboxChangeemail.bind(this);
    this.onTextboxChangepassword = this.onTextboxChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateLoginInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashbord"); // push user to dashbord when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashbord
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashbord");
    }
  }

  onTextboxChangeemail(event) {
    // const isValid = this.validate();
    // console.log(isValid);

    this.setState({
      email: event.target.value
    });
  }
  onTextboxChangepassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container">
          {/* Outer Row */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* Nested Row within Card Body */}
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image " />
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome</h1>
                        </div>
                        <form
                          className="user"
                          noValidate
                          onSubmit={this.onSubmit}
                        >
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              placeholder="Enter Email Address..."
                              value={this.state.email}
                              onChange={this.onTextboxChangeemail}
                            />
                            <span className="red-text"> {errors.email}</span>
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.onTextboxChangepassword}
                            />
                            <span className="red-text"> {errors.password}</span>
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <input
                            className="btn btn-primary btn-user btn-block"
                            type="submit"
                            value="Login"
                          />

                          <hr />
                        </form>
                        <hr />
                        <div className="text-center">
                          <a className="small" href={"/Password"}>
                            Forgot Password?
                          </a>
                        </div>
                        <div className="text-center">
                          <a className="small" href={"/Register"}>
                            Create an Account!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
