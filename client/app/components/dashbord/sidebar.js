import React, { Component } from "react";
import UsersTable from "../Home/Table/UsersTable";

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* Sidebar - Brand */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="/dashbord"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink" />
            </div>
            <div className="sidebar-brand-text mx-3">CHIFCO</div>
          </a>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <a className="nav-link" href="/dashbord">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </a>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider" />
          {/* Heading */}
          <div className="sidebar-heading">Interface</div>
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-fw fa-cog" />
              <span>Customers</span>
            </a>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Customers Edit:</h6>
                <a className="collapse-item" href="/add-customers">
                  <i className="fas fa-fw fa-cog2" />

                  <span> Add Customers</span>
                </a>
                <a className="collapse-item" href="/customersTable">
                  <i className="fas fa-fw fa-cog3" />

                  <span> Customers Liste</span>
                </a>
                <a className="collapse-item" href="/customersDetails">
                  <i className="fas fa-info-circle" />
                  <span> Customers Details</span>
                </a>
              </div>
            </div>
          </li>
          {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <i className="fas fa-fw fa-wrench" />
              <span>Transactions</span>
            </a>
            <div
              id="collapseUtilities"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="/Transactions-liste">
                  <i className="fas fa-users-cog" />
                  <span> Transaction Liste </span>
                </a>
                <a className="collapse-item" href="/AddForfait">
                  Borders
                </a>
                <a className="collapse-item" href="utilities-animation.html">
                  Animations
                </a>
                <a className="collapse-item" href="utilities-other.html">
                  Other
                </a>
              </div>
            </div>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider" />
          {/* Heading */}
          <div className="sidebar-heading">Addons</div>
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i className="fas fa-fw fa-folder" />
              <span>Pages</span>
            </a>
            <div
              id="collapsePages"
              className="collapse"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Login Screens:</h6>
                <a className="collapse-item" href="login.html">
                  Login
                </a>
                <a className="collapse-item" href="register.html">
                  Register
                </a>
                <a className="collapse-item" href="forgot-password.html">
                  Forgot Password
                </a>
                <div className="collapse-divider" />
                <h6 className="collapse-header">Other Pages:</h6>
                <a className="collapse-item" href="404.html">
                  404 Page
                </a>
                <a className="collapse-item" href="blank.html">
                  Blank Page
                </a>
              </div>
            </div>
          </li>
          {/* Nav Item - Charts */}
          <li className="nav-item">
            <a className="nav-link" href="charts.html">
              <i className="fas fa-fw fa-chart-area" />
              <span>Charts</span>
            </a>
          </li>
          {/* Nav Item - Tables */}
          <li className="nav-item">
            <a className="nav-link" href={"/usersliste"}>
              <i className="fas fa-fw fa-table" />
              <span>Users</span>
            </a>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider d-none d-md-block" />
          {/* Sidebar Toggler (Sidebar) */}
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" />
          </div>
        </ul>
      </div>
    );
  }
}
