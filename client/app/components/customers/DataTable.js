import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";

import axios from "axios";

export default class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
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
          .get(
            "http://0.0.0.0:8080/customers/" + this.props.obj._id + "/delete"
          )
          .then(() => {
            this.props.onDelete(this.props.obj);
          })
          .catch((err) => console.log(err));
        Swal.fire("Deleted!", "The Customer has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Customer is Safe :)", "error");
      }
    });
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });

    return (
      <tr>
        <td>{this.props.obj.firstName}</td>
        <td>{this.props.obj.lastName}</td>
        <td>{this.props.obj.address}</td>
        <td>{this.props.obj.solde}</td>
        <td>{this.props.obj.number}</td>

        <td>
          <button
            className="btnDel btn btn-default btn-xs"
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
            className="btnEdit btn btn-default btn-xs"
            name="btnEdit"
            to={"/editcustomer/" + this.props.obj._id}
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

        <td>
          <Link
            className="btnAdd btn btn-default btn-xs"
            style={{ borderColor: "#336686" }}
            to={"customersdetails/" + this.props.obj._id}
          >
            <i
              className="fas fa-eye"
              aria-hidden="true"
              style={{ color: "#336686" }}
            />
          </Link>
        </td>
      </tr>
    );
  }
}
