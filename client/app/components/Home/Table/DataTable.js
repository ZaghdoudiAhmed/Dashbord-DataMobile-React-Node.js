import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditUser from "./EditUser";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], addModalShow: false };

    this.delete = this.delete.bind(this);
  }
  delete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        axios
          .get("http://0.0.0.0:8080/users/" + this.props.obj._id + "/delete")
          .then(() => {
            this.props.onDelete(this.props.obj);
          })
          .catch((err) => console.log(err));
        Swal.fire("Deleted!", "The User has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your User is Safe :)", "error");
      }
    });
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });

    return (
      <tr>
        <td>{this.props.obj.firstName}</td>
        <td>{this.props.obj.lastName}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.roles}</td>
        <td>
          <button
            className="btnDel btn btn-default btn-xm"
            name="btnDel"
            onClick={this.delete}
            style={{ borderColor: "#b71c1c" }}
          >
            <i
              className="fa fa-trash"
              aria-hidden="true"
              style={{ color: "#b71c1c" }}
            />
            <span style={{ color: "#b71c1c" }}> Delete</span>
          </button>
        </td>
        <td>
          <Link
            className="btnEdit btn btn-default btn-xm"
            name="btnEdit"
            to={"/edituser/" + this.props.obj._id}
            style={{ borderColor: "#336686" }}
          >
            <i
              className="far fa-edit"
              aria-hidden="true"
              style={{ color: "#336686" }}
            />
            <span style={{ color: "#336686" }}> Edit</span>
          </Link>
        </td>
      </tr>
    );
  }
}

export default DataTable;
