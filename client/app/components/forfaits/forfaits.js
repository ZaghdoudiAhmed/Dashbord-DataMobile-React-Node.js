import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class Forfaits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
    this.onTextboxChangename = this.onTextboxChangename.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onTextboxChangename(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onClick(e) {
    e.preventDefault();
    const forfait = {
      name: this.state.name,
    };

    axios
      .post("http://0.0.0.0:8080/forfaits/", forfait)
      .then((res) => {
        this.props.handleaddForfait(res.data);
        Swal.fire(
          "Good job!",
          "Your Forfait is added successfully!",
          "success"
        );
        this.setState({
          name: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Forfait
          </Modal.Title>
          <i className="far fa-object-group"></i>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              {/* Name */}
              <div className="form-group ">
                <label> Name: </label>
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder=" Name"
                  value={this.state.name}
                  onChange={this.onTextboxChangename}
                />
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
