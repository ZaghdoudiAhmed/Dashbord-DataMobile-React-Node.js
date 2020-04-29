import React, { Component } from "react";
import Sidebar from "../dashbord/sidebar";
import Navbar from "../dashbord/navbar";
import axios from "axios";
import DataTable from "./DataTable";
import ReactToExcel from "react-html-table-to-excel";
import "./mystyle1.scss";

export default class customersTable extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], addModalShow: false, search: "" };
    this.handleDelete = this.handleDelete.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://0.0.0.0:8080/customers")
      .then((res) => {
        this.setState({ customers: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDelete(obj) {
    const filtredCustomers = this.state.customers.filter((customer) => {
      return customer._id != obj._id;
    });
    this.setState({ customers: filtredCustomers });
  }

  dataTable() {
    return this.state.customers.map((data, i) => {
      return <DataTable obj={data} key={i} onDelete={this.handleDelete} />;
    });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 10) });

    let filtredCustomers2 = this.state.customers.filter((customer) => {
      return (
        customer.number
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    let customers = this.state.customers;
    if (this.state.search !== "") {
      this.setState({ customers: filtredCustomers2 });
    } else this.setState({ customers: customers });
  }

  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-colum">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="container">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <div className="display-flex align-center">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Customers Table
                      </h6>
                      <div className="ml-auto display-flex align-center">
                        <input
                          type="text"
                          name
                          className="form-control"
                          placeholder="Search"
                          value={this.state.search}
                          onChange={this.updateSearch}
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
                            <th>First</th>
                            <th>Last</th>
                            <th>Address</th>
                            <th>Solde</th>
                            <th>Number</th>
                            <th>Delete</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>{this.dataTable()}</tbody>
                      </table>
                      <hr />
                      <ReactToExcel
                        className="fas fa-file-export"
                        table="mytable"
                        filename="excelfile"
                        sheet="sheet 1"
                        buttonText="EXPORT"
                      />
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
