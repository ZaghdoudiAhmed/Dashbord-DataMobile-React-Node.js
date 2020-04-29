import React, { Component } from "react";
import Sidebar from "../dashbord/sidebar";
import Navbar from "../dashbord/navbar";
import axios from "axios";
import "./mystyle.scss";

export default class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = { transactions: [] };
  }

  componentDidMount() {
    axios
      .get("http://0.0.0.0:8080/transactions")
      .then((res) => {
        this.setState({ transactions: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  rendertransactions() {
    return this.state.transactions.map((transaction) => {
      let begin_date = new Date(Date.parse(transaction.begin_date));
      let end_date = new Date(Date.parse(transaction.end_date));

      return (
        <tr>
          <td>{transaction._id}</td>
          <td>{begin_date.toLocaleDateString()}</td>
          <td>{end_date.toLocaleDateString()}</td>
          <td>{transaction.type_trans}</td>
          <td>{transaction.price}</td>
          <td>{transaction.customer_id}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-colum">
          <div id="content">
            <Navbar />
            <div className="container-fluid ">
              <div className="container">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <div className="display-flex align-center">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Transactions Liste
                      </h6>
                      <div className="ml-auto display-flex align-center">
                        <input
                          type="text"
                          name
                          className="form-control"
                          placeholder="Search"
                        />
                        <button className="btn btn-md btn-primary ml-2">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        width="100%"
                        cellSpacing={0}
                      >
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>Begin</th>
                            <th>End</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Customer id</th>
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
