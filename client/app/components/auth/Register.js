import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "whatwg-fetch";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import validateRegisterInput from "../../../../server/validation/Register";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onTextboxChangefirstName = this.onTextboxChangefirstName.bind(this);
    this.onTextboxChangelastName = this.onTextboxChangelastName.bind(this);
    this.onTextboxChangeemail = this.onTextboxChangeemail.bind(this);
    this.onTextboxChangepassword = this.onTextboxChangepassword.bind(this);
    this.onTextboxChangepassword2 = this.onTextboxChangepassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashbord
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashbord");
    }
  }

  onTextboxChangeemail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onTextboxChangepassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  onTextboxChangepassword2(event) {
    this.setState({
      password2: event.target.value
    });
  }

  onTextboxChangefirstName(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  onTextboxChangelastName(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateRegisterInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };

      this.props.registerUser(newUser, this.props.history);
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" />
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form className="user" noValidate onSubmit={this.onSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="First Name"
                          value={this.state.firstName}
                          onChange={this.onTextboxChangefirstName}
                        />
                        <span className="red-text"> {errors.firstName}</span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          id="exampleLastName"
                          placeholder="Last Name"
                          className="form-control form-control-user"
                          value={this.state.lastName}
                          onChange={this.onTextboxChangelastName}
                        />
                        <span className="red-text"> {errors.lastName}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        id="exampleInputEmail"
                        placeholder="Email Address"
                        className="form-control form-control-user"
                        value={this.state.email}
                        onChange={this.onTextboxChangeemail}
                      />
                      <span className="red-text"> {errors.email}</span>
                    </div>
                    <div className="form-group ">
                      <input
                        type="password"
                        id="exampleInputPassword"
                        placeholder="Password"
                        className="form-control form-control-user"
                        value={this.state.password}
                        onChange={this.onTextboxChangepassword}
                      />
                      <span className="red-text"> {errors.password}</span>
                    </div>

                    <div className="form-group ">
                      <input
                        type="password"
                        id="Verify Password"
                        placeholder="Verif Password"
                        className="form-control form-control-user"
                        value={this.state.password2}
                        onChange={this.onTextboxChangepassword2}
                      />
                      <span className="red-text"> {errors.password2}</span>
                    </div>
                    <input
                      className="btn btn-primary btn-user btn-block"
                      type="submit"
                      value="Register"
                    />

                    <hr />
                  </form>
                  <div className="text-center">
                    <a className="small" href={"/password"}>
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a className="small" href={"/Login"}>
                      Already have an account? Login!
                    </a>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
