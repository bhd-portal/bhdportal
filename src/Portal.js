import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBBtn
} from "mdbreact";
import logo from "./logo.png";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "./Routes";
import "./assets/portal_stylesheet.css";

import Axios from "axios";
import { RootUrl } from "./components/constants";

class Portal extends Component {
  state = {
    collapseID: "",
    modal1: false,
    modal2: false,
    modal3: false,
    activeItem: "1",

    name: "",
    password: ""
  };

  renderManagement() {
    if (localStorage.getItem("token")) {
      return (
        <MDBNavItem>
          <MDBNavLink
            onClick={this.closeCollapse("mainNavbarCollapse")}
            to="/admin"
          >
            ניהול
            <i className="fas fa-user-cog ml-2" />
          </MDBNavLink>
        </MDBNavItem>
      );
    } else {
      return;
    }
  }

  componentWillMount() {
    if (localStorage.getItem("token")) {
      // user is logged
      console.log("user is logged!!!");
    }
  }

  handleUsernameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  componentDidMount() {
    this.inputInformation = {};
  }

  loginAccount() {
    Axios.post(`${RootUrl}/admins/login`, {
      name: this.state.name,
      password: this.state.password
    }).then(resp => {
      if (!resp.data.success) {
        return;
      }
      //write token into cookies
      localStorage.setItem("token", resp.data.token);
      this.setState({ modal2: false });
    });
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  toggleTab = tab => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className="flyout">
        <MDBNavbar color="bg-dark" fixed="top" dark expand="md" scrolling transparent>
          {/* <MDBNavbar
            color="tabs-blue"
            dark
            expand="md"
            fixed="top"
            scrolling
            style={{
              paddingTop: "0px",
              paddingBottom: "0px"
            }}
          > */}
            <MDBNavbarBrand href="/">
              <img src={logo} style={{height: "2.5rem", width: "3.2rem"}}/> 
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav right style={{ fontSize: "18px" }}>
                {this.renderManagement()}
                { <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/gallery"
                  >
                    גלריית התמונות
                    <i className="fas fa-images ml-2" />
                  </MDBNavLink>
                </MDBNavItem> }
                                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/powerpoint"
                  >
                    מצגות
                    <i className="fas fa-paperclip ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/documents"
                  >
                    טפסים נפוצים
                    <i className="fas fa-paperclip ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/ab_guidance"
                  >
                    א"ב בהדרכה
                    <i className="fab fa-leanpub ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <a
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    href="http://www.google.com"
                    target="_blank"
                    class="nav-link Ripple-parent"
                  >
                    פורומים
                    <i className="fas fa-user-friends ml-2" />
                  </a>
                </MDBNavItem>
                <MDBNavItem>
                  <a
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    href="http://www.google.com"
                    target="_blank"
                    class="nav-link Ripple-parent"
                  >
                    MOOC
                    <i className="fas fa-graduation-cap ml-2" />
                  </a>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/products"
                  >
                    קטלוג תוצרי הדרכה
                    <i className="fas fa-dice-d6 ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    <i className="fas fa-home " style={{ fontSize: "23px" }} />
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          <main>
            <Routes />
          </main>
          <MDBFooter
            color="special-color"
            align="right"
            style={{ display: "flex", direction: "rtl" }}
            className="justify-space-between center-items-v"
          >
            <p className="footer-copyright mb-0 py-3 text-center">
              <Link rounded onClick={this.toggle(2)} to="#">
                &copy;
              </Link>{" "}
              {new Date().getFullYear()} Copyright
            </p>

			<button type="button" class="btn btn-link btn-lg" data-target="#about" onClick={this.toggle(3)} to="#">
              אודות
			</button>


			<MDBModal
              className="form-elegant "
              isOpen={this.state.modal3}
              toggle={this.toggle(3)}
            >
              <MDBModalBody className="mx-3 ">
                <hr className="my-3" />
                <section className="form-elegant">
                  <div className="text-center">
                    <h1 className="dark-grey-text mb-5">
                      <strong>אודות</strong>
                    </h1>
                  </div>
                  <div className="text-center">
                    <h6 className="dark-grey-text mb-5">
        		      Crafted With &hearts; Aviv Day, Nadav, Orel, Coral &amp; Kamanim 175
        		    </h6>
	      		  </div>
                </section>
              </MDBModalBody>
            </MDBModal>

            <img className="footer-copyright" src={require('./images/artech.png')} width="70px" />

            <MDBModal
              className="form-elegant "
              isOpen={this.state.modal2 && !localStorage.getItem("token")}
              toggle={this.toggle(2)}
            >
              <MDBModalBody className="mx-3 ">
                <hr className="my-3" />
                <section className="form-elegant">
                  <div className="text-center">
                    <h1 className="dark-grey-text mb-5">
                      <strong>כניסת מנהל</strong>
                    </h1>
                  </div>

                  <MDBInput
                    label="שם משתמש"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    className="admin-name-pass"
                    value={this.state.name}
                    onChange={e => this.handleUsernameChange(e)}
                  />
                  <MDBInput
                    label="סיסמא"
                    group
                    type="password"
                    validate
                    containerclassName="mb-0"
                    className="admin-name-pass"
                    value={this.state.password}
                    onChange={e => this.handlePasswordChange(e)}
                  />
                  <div className="text-center mb-3 pr-5 pl-5">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      onClick={() => {
                        this.loginAccount();
                      }}
                      rounded
                      className="btn-block z-depth-1a admin-button"
                    >
                      <i
                        className="fas fa-sign-in-alt ml-3"
                        style={{ fontSize: "100%" }}
                      />
                      התחבר
                    </MDBBtn>
                  </div>
                </section>
              </MDBModalBody>
            </MDBModal>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default Portal;
