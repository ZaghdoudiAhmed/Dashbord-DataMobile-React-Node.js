import React, { Component } from "react";
import axios from "axios";
import DataTable from "../Table/DataTable";
import Sidebar from "../../dashbord/sidebar";
import Navbar from "../../dashbord/navbar";
import AddUser from "./AddUser";
import { Button, ButtonToolbar } from "react-bootstrap";

export default class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], addModalShow: false, search: "" };

    this.handleDelete = this.handleDelete.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    // this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://0.0.0.0:8080/users")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDelete(obj) {
    const filtredUsers = this.state.users.filter((user) => {
      return user._id != obj._id;
    });
    this.setState({ users: filtredUsers });
  }

  addUser(user) {
    const users = [...this.state.users, user];

    this.setState({ users });
  }

  dataTable() {
    return this.state.users.map((data, i) => {
      return <DataTable obj={data} key={i} onDelete={this.handleDelete} />;
    });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });

    let filtredUsers = [];
    if (this.state.search.replace(/\s/g, "").length) {
      filtredUsers = this.props.users.filter((user) => {
        return (
          user.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
        );
      });
    } else {
      filtredUsers = this.state.users;
    }
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });

    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-colum ">
          <div id="content">
            <Navbar />
            <div className="container-fluid ">
              <h1 className="h3 mb-2 text-gray-800">UsersTable</h1>
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <div className="display-flex align-center">
                    <ButtonToolbar>
                      <Button
                        variant="btnAdd btn btn-default btn-xs"
                        name="btnAdd"
                        type="submit"
                        style={{ borderColor: "#43A047" }}
                        onClick={() => this.setState({ addModalShow: true })}
                      >
                        <i
                          className="fa fa-plus-circle"
                          aria-hidden="true"
                          style={{ color: "#43A047" }}
                        />
                        <span style={{ color: "#43A047" }}> Add User</span>
                      </Button>
                      <AddUser
                        handleadduser={this.addUser}
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                      />
                    </ButtonToolbar>
                    <div className="ml-auto display-flex align-center">
                      <input
                        type="text"
                        name
                        className="form-control"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={this.updateSearch}
                      />
                      <button
                        className="btn btn-md btn-primary ml-2"
                        // onClick={this.updateSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="dataTable_wrapper"
                    className="dataTables_wrapper dt-bootstrap4"
                  >
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div
                          className="dataTables_length"
                          id="dataTable_length"
                        ></div>
                      </div>
                      <div className="col-sm-12 col-md-6"></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <table
                        id="mytable"
                        className="table table-striped "
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                            <th>Edit </th>
                          </tr>
                        </thead>

                        <tbody>{this.dataTable()}</tbody>
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
