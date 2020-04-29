import React, { Component } from "react";
import Sidebar from "../dashbord/sidebar";
import Navbar from "../dashbord/navbar";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      mobilenumber: "",
      solde: "",
      forfait: "",
      typedonnee: "",
      errors: {},
      customers: [],
      groupes: []
    };
    this.onTextboxChangefirstName = this.onTextboxChangefirstName.bind(this);
    this.onTextboxChangelastName = this.onTextboxChangelastName.bind(this);
    this.onTextboxChangeaddress = this.onTextboxChangeaddress.bind(this);
    this.onTextboxChangenumber = this.onTextboxChangenumber.bind(this);
    this.onTextboxChangesolde = this.onTextboxChangesolde.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onTextboxChangetypedonnee = this.onTextboxChangetypedonnee.bind(this);
    this.onTextboxChangegroupe = this.onTextboxChangegroupe.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://0.0.0.0:8080/customers/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          address: res.data.data.address,
          number: res.data.data.number,
          solde: res.data.data.solde,
          typedonnee: res.data.data.typedonnee,
          forfait: res.data.data.forfait,
          groupe: res.data.data.groupe
        });
      })
      .catch(error => {
        alert("Error" + error);
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
  onTextboxChangeaddress(event) {
    this.setState({
      address: event.target.value
    });
  }
  onTextboxChangenumber(event) {
    this.setState({
      number: event.target.value
    });
  }
  onTextboxChangesolde(event) {
    this.setState({
      solde: event.target.value
    });
  }
  onRadioChange(event) {
    this.setState({
      forfait: event.target.value
    });
  }
  onTextboxChangetypedonnee(event) {
    this.setState({
      typedonnee: event.target.value
    });
  }
  onTextboxChangegroupe(event) {
    this.setState({
      groupe: event.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const customer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      number: this.state.number,
      solde: this.state.solde,
      typedonnee: this.state.typedonnee,
      forfait: this.state.forfait,
      groupe: this.state.groupe
    };
    console.log(customer);

    axios
      .post(
        "http://0.0.0.0:8080/customer/update/" + this.props.match.params.id,
        customer
      )
      .then(res => {
        if (res.data.success === true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Customer has been updated !",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          alert("Error");
        }
      })
      .catch(error => {
        alert("Error 34 " + error);
      });
  }
  render() {
    let optionItems = this.state.groupes.map(groupes => (
      <option key={groupes.name}>{groupes.name}</option>
    ));

    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-colum">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="centred">
                {/* Circle Buttons */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-warning">
                      Edit Customer
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>First Name:</label>
                          <input
                            type="text"
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
                            className="form-control"
                            value={this.state.solde}
                            onChange={this.onTextboxChangesolde}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">TND</span>
                            <span className="input-group-text">0.00</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label>Mobile Number :</label>
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text">+216</div>
                            </div>
                            <input
                              type="text"
                              className="form-control py-0"
                              value={this.state.number}
                              onChange={this.onTextboxChangenumber}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-4">
                          <label>Type de donnée:</label>
                          <select
                            className="form-control"
                            onChange={this.onTextboxChangetypedonnee}
                            value={this.state.typedonnee}
                          >
                            <option>Choose...</option>
                            <option>voix</option>
                            <option>Data</option>
                            <option>Evoucher</option>
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <label>Groupes:</label>
                          <select
                            className="form-control"
                            onChange={this.onTextboxChangegroupe}
                            value={this.state.groupe}
                          >
                            <option>Choose...</option>
                            <option>Hotel</option>
                            <option>Aeroport</option>
                            <option>Societe</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Select forfait:</label>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="forfait par jour"
                            checked={this.state.forfait === "forfait par jour"}
                            onChange={this.onRadioChange}
                          />
                          <label className="form-check-label">
                            forfait par jour
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="forfait par semaine"
                            checked={
                              this.state.forfait === "forfait par semaine"
                            }
                            onChange={this.onRadioChange}
                          />
                          <label className="form-check-label">
                            forfait par semaine
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="forfait par mois"
                            checked={this.state.forfait === "forfait par mois"}
                            onChange={this.onRadioChange}
                          />
                          <label className="form-check-label">
                            forfait par mois
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btnEdit btn btn-default btn-xs"
                        style={{ borderColor: "#336686" }}
                      >
                        <i
                          className="far fa-edit"
                          aria-hidden="true"
                          style={{ color: "#336686" }}
                        />
                        <span style={{ color: "#336686" }}> Edit</span>
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
