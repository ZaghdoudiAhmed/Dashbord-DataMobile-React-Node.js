import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../dashbord/sidebar";
import Navbar from "../../dashbord/navbar";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./mystyle.scss";

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roles: [],
      users: [],
    };

    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangerole = this.onChangerole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.myFunction = this.myFunction.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://0.0.0.0:8080/users/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          email: res.data.data.email,
          password: res.data.data.password,
          roles: res.data.data.roles,
        });
      })
      .catch((error) => {
        alert("Error" + error);
      });
  }
  onChangefirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }
  onChangelastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }
  onChangeemail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangepassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangerole(e) {
    this.setState({
      roles: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      roles: this.state.roles,
    };
    console.log(user);

    axios
      .put("http://0.0.0.0:8080/users/" + this.props.match.params.id, user)
      .then((res) => {
        if (res.data.success === true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your user has been updated !",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
  }
  myFunction() {
    var x = document.getElementById("password-field");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-colum">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <form
                onSubmit={this.onSubmit}
                className=" border border-light p-5"
              >
                <label>firstName</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control mb-4"
                  value={this.state.firstName}
                  onChange={this.onChangefirstName}
                />
                <label>lastName</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control mb-4"
                  value={this.state.lastName}
                  onChange={this.onChangelastName}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control mb-4"
                  value={this.state.email}
                  onChange={this.onChangeemail}
                />
                <label>Password</label>
                <input
                  id="password-field"
                  type="password"
                  className="form-control "
                  name="password"
                  onChange={this.onChangepassword}
                />
                <span
                  toggle="#password-field"
                  className="fa fa-lg fa-eye field-icon toggle-password"
                  onClick={this.myFunction}
                />
                <label className="mdb-main-label">Role: </label>

                <select
                  className="form-control mb-4"
                  onChange={this.onChangerole}
                  value={this.state.roles}
                >
                  <option value={"ROLE_USER"}>Utilisateur</option>
                  <option value={"ROLE_ADMIN"}>Administrateur</option>
                </select>
                <hr />
                <button type="submit" className="btn btn-info ">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
