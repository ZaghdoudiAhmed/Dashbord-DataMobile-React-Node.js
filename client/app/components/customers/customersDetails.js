import React, { Component } from "react";
import Navbar from "../dashbord/navbar";
import Sidebar from "../dashbord/sidebar";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./mystyle1.scss";

export default class customersDetails extends Component {
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
      created: "",
      price: "",
      type_trans: "",
      end_date: "",
      begin_date: "",
      customer_id: "",
      transactions: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextboxChangebegin_date = this.onTextboxChangebegin_date.bind(this);
    this.onTextboxChangeend_date = this.onTextboxChangeend_date.bind(this);
    this.onTextboxChangeprice = this.onTextboxChangeprice.bind(this);
    this.onTextboxChangetype_trans = this.onTextboxChangetype_trans.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://0.0.0.0:8080/customers/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          address: res.data.data.address,
          number: res.data.data.number,
          solde: res.data.data.solde,
          typedonnee: res.data.data.typedonnee,
          forfait: res.data.data.forfait,
          groupe: res.data.data.groupe,
          created: res.data.data.created,
        });
      })
      .catch((error) => {
        alert("Error" + error);
      });

    axios
      .get(
        "http://0.0.0.0:8080/customers/" +
          this.props.match.params.id +
          "/transactions"
      )
      .then((res) => {
        this.setState({ transactions: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onTextboxChangeprice(event) {
    this.setState({
      price: event.target.value,
    });
  }
  onTextboxChangetype_trans(event) {
    this.setState({
      type_trans: event.target.value,
    });
  }
  onTextboxChangebegin_date(event) {
    this.setState({
      begin_date: event.target.value,
    });
  }
  onTextboxChangeend_date(event) {
    this.setState({
      end_date: event.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const transactionObject = {
      price: this.state.price,
      type_trans: this.state.type_trans,
      end_date: this.state.end_date,
      begin_date: this.state.begin_date,
    };

    axios
      .post(
        "http://0.0.0.0:8080/customers/" +
          this.props.match.params.id +
          "/transactions",
        transactionObject
      )
      .then((res) => {
        this.addTransaction(res.data);
        Swal.fire(
          "Good job!",
          "Your transaction is added successfully!",
          "success"
        );
        this.setState({
          price: "",
          type_trans: "",
          end_date: "",
          begin_date: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  rendertransactions() {
    return this.state.transactions.map((transaction) => {
      let begin_date = new Date(Date.parse(transaction.begin_date));
      let end_date = new Date(Date.parse(transaction.end_date));

      return (
        <tr>
          <td>{transaction.type_trans}</td>
          <td>{begin_date.toLocaleDateString()}</td>
          <td>{end_date.toLocaleDateString()}</td>
          <td>{transaction.price}</td>
        </tr>
      );
    });
  }

  addTransaction(transaction) {
    const transactions = [...this.state.transactions, transaction];

    this.setState({ transactions });
  }

  render() {
    const created_date = new Date(Date.parse(this.state.created));
    console.log(created_date);
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-colum">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <div
                        className="w-responsive text-center mx-auto p-3 mt-2"
                        style={{ backgroundColor: "#eee" }}
                      >
                        Customer Details
                        <i className="fas fa-clipboard-list" />
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered success">
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <td>{this.state.firstName}</td>
                          </tr>
                          <tr>
                            <th className="info">Last Name</th>
                            <td>{this.state.lastName}</td>
                          </tr>
                          <tr>
                            <th className="info">Address</th>
                            <td>{this.state.address}</td>
                          </tr>
                          <tr>
                            <th className="info">Phone Number</th>
                            <td>{this.state.number}</td>
                          </tr>
                          <tr>
                            <th className="info">Solde(TND)</th>
                            <td>{this.state.solde}</td>
                          </tr>
                          <tr>
                            <th className="info">Groupe</th>
                            <td>{this.state.groupe}</td>
                          </tr>
                          <tr>
                            <th className="info">Forfait</th>
                            <td>{this.state.forfait}</td>
                          </tr>

                          <tr>
                            <th className="info">Approval Status</th>
                            <td>
                              <b>Active</b>
                            </td>
                          </tr>

                          <tr>
                            <th className="info ">Register Date</th>
                            <td>{created_date.toLocaleDateString()}</td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="card">
                    <h5 className="card-header">Transactions</h5>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                        <div className="row ">
                          <div className="form-groupe col-6 ">
                            <label htmlFor="exampleSelect1">Type:</label>
                            <select
                              className="form-control"
                              id="exampleSelect1"
                              onChange={this.onTextboxChangetype_trans}
                              value={this.state.type_trans}
                            >
                              <option>Choose...</option>
                              <option>Voix</option>
                              <option>Data</option>
                              <option>Evaucher</option>
                            </select>
                          </div>
                          <div className="form-groupe col-6">
                            <label>Price: </label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Price"
                                value={this.state.price}
                                onChange={this.onTextboxChangeprice}
                              />
                              <div className="input-group-append">
                                <span
                                  className="input-group-text"
                                  id="basic-addon2"
                                >
                                  TND
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-6">
                            <label>Date of begin</label>
                            <div>
                              <input
                                className="form-control"
                                type="date"
                                id="example-date-input"
                                value={this.state.begin_date}
                                onChange={this.onTextboxChangebegin_date}
                              />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label>Date of end</label>
                            <div>
                              <input
                                className="form-control"
                                type="date"
                                id="example-date-input2"
                                value={this.state.end_date}
                                onChange={this.onTextboxChangeend_date}
                              />
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                  <hr />
                  <div className="card">
                    <h5 className="card-header"> Liste of Transactions</h5>
                    <div className="card-body" id="sailorTableArea">
                      <table
                        id="sailorTable"
                        className="table table-striped "
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th>trans</th>
                            <th>begin_date</th>
                            <th>end_date</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>{this.rendertransactions()}</tbody>
                      </table>
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
