import React, { Component } from "react";
// import {forgotpassword} from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

export default class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errors: {}
    };
    // this.onSubmit= this.onSubmit.bind(this);
  }

  // onSubmit = e => {
  //         e.preventDefault();

  //         const userData = {
  //             email: this.state.email,

  //         };
  //        this.props.forgotpassword(userData);
  //     };

  render() {
    return (
      <div className="container">
        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-password-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-2">
                          Forgot Your Password?
                        </h1>
                        <p className="mb-4">
                          We get it, stuff happens. Just enter your email
                          address below and we'll send you a link to reset your
                          password!
                        </p>
                      </div>
                      <form className="user" onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                          />
                        </div>
                        <input
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                          value="Reset Password"
                        />
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href={"/Register"}>
                          Create an Account!
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
        </div>
      </div>
    );
  }
}

// Password.propTypes = {
//   forgotpassword: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// export default connect(mapStateToProps, { forgotpassword })(Password);
