import React, { Component } from "react";
import Sidebar from "../dashbord/sidebar";
import Navbar from "../dashbord/navbar";
import axios from "axios";

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      selectedFile: null,
      users: []
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0]);
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post("http://0.0.0.0:8080/users/upload-avatar", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };
  componentDidMount() {
    axios
      .get("http://0.0.0.0:8080/users/get/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          email: res.data.data.email,
          password: res.data.data.password
        });
      })
      .catch(error => {
        alert("Error" + error);
      });
  }

  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-colum">
          <div id="content">
            <Navbar />
            <div className="container">
              <h1 className="page-header">Edit Profile</h1>
              <div className="row">
                {/* left column */}
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <div className="text-center">
                    <img
                      className="img-profile rounded-circle"
                      src="https://source.unsplash.com/user/erondu/60x60"
                    />
                    <hr />
                    <h6>Upload a different photo...</h6>
                    <input
                      type="file"
                      name="file"
                      onChange={this.onChangeHandler}
                    />
                    <hr />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.onClickHandler}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                {/* edit form column */}
                <div className="col-md-8  personal-info">
                  <h3>Personal info</h3>
                  <form className="form-horizontal" role="form">
                    <div className="form-group">
                      <label className="col-lg-3 control-label">
                        First name:
                      </label>
                      <div className="col-lg-8">
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-lg-3 control-label">
                        Last name:
                      </label>
                      <div className="col-lg-8">
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-lg-3 control-label">Email:</label>
                      <div className="col-lg-8">
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-3 control-label">
                        Password:
                      </label>
                      <div className="col-md-8">
                        <input className="form-control" type="password" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-3 control-label">
                        Confirm password:
                      </label>
                      <div className="col-md-8">
                        <input className="form-control" type="password" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-3 control-label" />
                      <div className="col-md-8">
                        <input
                          className="btn btn-primary"
                          defaultValue="Save Changes"
                          type="button"
                        />
                        <span />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
