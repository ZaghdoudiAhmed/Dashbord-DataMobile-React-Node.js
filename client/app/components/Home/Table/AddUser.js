import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import validateAddInput from "../../../../../server/validation/adduser";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: {},
      roles: [],
    };

    this.onTextboxChangefirstName = this.onTextboxChangefirstName.bind(this);
    this.onTextboxChangelastName = this.onTextboxChangelastName.bind(this);
    this.onTextboxChangeemail = this.onTextboxChangeemail.bind(this);
    this.onTextboxChangepassword = this.onTextboxChangepassword.bind(this);
    this.onTextboxChangepassword = this.onTextboxChangepassword.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onTextboxChangeemail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  onTextboxChangepassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onTextboxChangefirstName(event) {
    this.setState({
      firstName: event.target.value,
    });
  }

  onTextboxChangelastName(event) {
    this.setState({
      lastName: event.target.value,
    });
  }

  onTextboxChangepassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onChangeHandle(event) {
    this.setState({
      roles: event.target.value,
    });
  }
  isValid() {
    const { errors, isValid } = validateAddInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onClick(e) {
    e.preventDefault();
    if (this.isValid()) {
      const userObject = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        roles: this.state.roles,
      };
      axios
        .post("http://0.0.0.0:8080/users/", userObject)
        .then((res) => {
          this.props.handleadduser(res.data);
          Swal.fire("Good job!", "Your User is added successfully!", "success");
          this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            roles: [],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              {/* Name */}
              <div className="form-group ">
                <label> FirstName: </label>
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.onTextboxChangefirstName}
                />
                <span className="badge badge-danger">{errors.firstName}</span>
              </div>
              <div className="form-group ">
                <label> lastName: </label>

                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.onTextboxChangelastName}
                />
                <span className="badge badge-danger">{errors.lastName}</span>
              </div>
              {/* Email */}
              <div className="form-group ">
                <label> Email: </label>

                <input
                  type="email"
                  className="form-control mb-4"
                  id="exampleInputEmail"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.onTextboxChangeemail}
                />
                <span className="badge badge-danger">{errors.email}</span>
              </div>
              <div className="form-group ">
                <label> Password: </label>

                <input
                  type="password"
                  className="form-control mb-4"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onTextboxChangepassword}
                />
                <span className="badge badge-danger">{errors.password}</span>
              </div>
              <div className="form-group">
                <label className="mdb-main-label">Role: </label>

                <select
                  className="form-control mb-4"
                  onChange={this.onChangeHandle}
                  value={this.state.roles}
                >
                  <option value={"ROLE_USER"}>Utilisateur</option>
                  <option value={"ROLE_ADMIN"}>Administrateur</option>
                </select>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button
            className="btn btn-primary btn-user btn-block"
            onClick={this.onClick}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
