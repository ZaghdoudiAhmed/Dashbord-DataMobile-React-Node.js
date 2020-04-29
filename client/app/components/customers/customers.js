import React, { Component } from "react";
import Navbar from "../dashbord/navbar";
import Sidebar from "../dashbord/sidebar";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Button, ButtonToolbar } from "react-bootstrap";
import Groupes from "../groupes/groupes";
import Forfaits from "../forfaits/forfaits";

export default class customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      number: "",
      solde: "",
      forfait: "",
      typedonnee: "",
      groupe: "",
      customers: [],
      groupes: [],
      forfaits: [],
    };
    this.onTextboxChangefirstName = this.onTextboxChangefirstName.bind(this);
    this.onTextboxChangelastName = this.onTextboxChangelastName.bind(this);
    this.onTextboxChangeaddress = this.onTextboxChangeaddress.bind(this);
    this.onTextboxChangenumber = this.onTextboxChangenumber.bind(this);
    this.onTextboxChangesolde = this.onTextboxChangesolde.bind(this);
    this.onTextboxChangetypedonnee = this.onTextboxChangetypedonnee.bind(this);
    this.onTextboxChangegroupe = this.onTextboxChangegroupe.bind(this);
    this.onTextboxChangeforfait = this.onTextboxChangeforfait.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.addGroupe = this.addGroupe.bind(this);
    this.addForfait = this.addForfait.bind(this);
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
  onTextboxChangeaddress(event) {
    this.setState({
      address: event.target.value,
    });
  }
  onTextboxChangenumber(event) {
    this.setState({
      number: event.target.value,
    });
  }
  onTextboxChangesolde(event) {
    this.setState({
      solde: event.target.value,
    });
  }

  onTextboxChangetypedonnee(event) {
    this.setState({
      typedonnee: event.target.value,
    });
  }
  onTextboxChangegroupe(event) {
    this.setState({
      groupe: event.target.value,
    });
  }
  onTextboxChangeforfait(event) {
    this.setState({
      forfait: event.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const customerObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      number: this.state.number,
      solde: this.state.solde,
      forfait: this.state.forfait,
      typedonnee: this.state.typedonnee,
      groupe: this.state.groupe,
    };
    axios
      .post("http://0.0.0.0:8080/customers/", customerObject)
      .then((res) => {
        Swal.fire(
          "Good job!",
          "Your Customer is added successfully!",
          "success"
        );
        this.setState({
          firstName: "",
          lastName: "",
          address: "",
          number: "",
          solde: "",
          forfait: "",
          typedonnee: "",
          groupe: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get("http://0.0.0.0:8080/groupes/")
      .then((res) => {
        this.setState({ groupes: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://0.0.0.0:8080/forfaits/")
      .then((res) => {
        this.setState({ forfaits: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addGroupe(groupe) {
    const groupes = [...this.state.groupes, groupe];

    this.setState({ groupes });
  }

  addForfait(forfait) {
    const forfaits = [...this.state.forfaits, forfait];
    this.setState({ forfaits });
  }
  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    let addModalClose2 = () => this.setState({ addModalShow2: false });

    let optionItems = this.state.groupes.map((groupes) => (
      <option key={groupes.name}>{groupes.name}</option>
    ));

    let optionItems2 = this.state.forfaits.map((forfaits) => (
      <option key={forfaits.name}>{forfaits.name}</option>
    ));
    return (
      <div id="wrapper">
        <Sidebar />

        <div id="content-wrapper" className="d-flex flex-colum">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="centred">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6
                      className="m-0 font-weight-bold "
                      style={{ color: "#9fc238" }}
                    >
                      ADD CUSTOMER
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>First Name:</label>
                          <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="firstName"
                            value={this.state.firstName}
                            onChange={this.onTextboxChangefirstName}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Last Name:</label>
                          <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="lastName"
                            value={this.state.lastName}
                            onChange={this.onTextboxChangelastName}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Address:</label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          placeholder="245 Rue jasmin"
                          value={this.state.address}
                          onChange={this.onTextboxChangeaddress}
                        />
                      </div>
                      <div className="form-group">
                        <label>Solde: </label>
                        <div className="input-group">
                          <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.solde}
                            onChange={this.onTextboxChangesolde}
                            required
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">TND</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label>Mobile Number :</label>
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text">+216</div>
                            </div>
                            <input
                              type="tel"
                              id="phone"
                              className="form-control py-0"
                              pattern="[0-9]{8}"
                              required
                              value={this.state.number}
                              onChange={this.onTextboxChangenumber}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-3">
                          <label>Type de donnée:</label>
                          <select
                            className="form-control"
                            onChange={this.onTextboxChangetypedonnee}
                            value={this.state.typedonnee}
                            required
                          >
                            <option>Choose...</option>
                            <option>Voix</option>
                            <option>Data</option>
                            <option>Evoucher</option>
                          </select>
                        </div>
                        <div className="form-group col-md-3">
                          <label>Groupes:</label>
                          <select
                            className="form-control"
                            required
                            onChange={this.onTextboxChangegroupe}
                            value={this.state.groupe}
                          >
                            <option>Choose...</option>
                            {optionItems}
                          </select>
                        </div>
                        <div className="form-group col-md-2">
                          <ButtonToolbar>
                            <Button
                              onClick={() =>
                                this.setState({ addModalShow: true })
                              }
                              variant="btnAdd btn btn-default btn-xs"
                              name="btnAdd"
                              type="submit"
                              style={{ borderColor: "#43A047" }}
                            >
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                                style={{ color: "#43A047" }}
                              />
                              {/* <span style={{ color: "#43A047" }}>
                                Add Groupe
                              </span> */}
                            </Button>
                            <Groupes
                              show={this.state.addModalShow}
                              onHide={addModalClose}
                              handleaddGroupe={this.addGroupe}
                            />
                          </ButtonToolbar>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label>Forfaits:</label>
                          <select
                            className="form-control"
                            required
                            onChange={this.onTextboxChangeforfait}
                            value={this.state.forfait}
                          >
                            <option>Choose...</option>
                            {optionItems2}
                          </select>
                        </div>
                        <div className="form-group col-md-2">
                          <ButtonToolbar>
                            <Button
                              onClick={() =>
                                this.setState({ addModalShow2: true })
                              }
                              variant="btnAdd btn btn-default btn-xs"
                              name="btnAdd"
                              type="submit"
                              style={{ borderColor: "#43A047" }}
                            >
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                                style={{ color: "#43A047" }}
                              />
                              {/* <span style={{ color: "#43A047" }}>
                                Add Forfait
                              </span> */}
                            </Button>
                            <Forfaits
                              show={this.state.addModalShow2}
                              onHide={addModalClose2}
                              handleaddForfait={this.addForfait}
                            />
                          </ButtonToolbar>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary btn-rounded waves-effect"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
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
