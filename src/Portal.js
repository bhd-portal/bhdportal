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
  MDBInput,
  MDBBtn
} from "mdbreact";
import { ReactComponent as Logo } from "./assets/intelLogo.svg";
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
    if(localStorage.getItem("token")) {
      return (
        <MDBNavItem>
          <MDBNavLink
            onClick={this.closeCollapse("mainNavbarCollapse")}
            to="/admin"
          >
            ניהול
            <i class="fas fa-user-cog ml-2" />
          </MDBNavLink>
        </MDBNavItem>
      )
    }
    else {
      return;
    }
  }

  componentWillMount() {
    if(localStorage.getItem("token")) {
      // user is logged
      console.log("user is logged!!!")
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
    console.log(this.inputInformation);
    Axios.post(`${RootUrl}/admins/login`, {
      name: this.state.name,
      password: this.state.password
    }).then(resp => {
      if(!resp.data.success) { return; }
      //write token into cookies
      localStorage.setItem("token", resp.data.token);
      this.setState({modal2: false});
    })
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
          <MDBNavbar
            color="tabs-blue"
            dark
            expand="md"
            fixed="top"
            scrolling
            style={{
              paddingTop: "0px",
              paddingBottom: "0px"
            }}
          >
            <MDBNavbarBrand href="/">
              <Logo style={{ height: "2.5rem", width: "2.5rem" }} />
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
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/gallery"
                  >
                    גלריית התמונות
                    <i class="fas fa-images ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/documents"
                  >
                    טפסים נפוצים
                    <i class="fas fa-paperclip ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/ab_guidance"
                  >
                    א"ב בהדרכה
                    <i class="fab fa-leanpub ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/forums"
                  >
                    פורומים
                    <i class="fas fa-user-friends ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/mooc"
                  >
                    MOOC
                    <i class="fas fa-graduation-cap ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/products"
                  >
                    קטלוג תוצרי הדרכה
                    <i class="fas fa-dice-d6 ml-2" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    <i class="fas fa-home " style={{ fontSize: "23px" }} />
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
            style={{ direction: "rtl" }}
          >
            <p className="footer-copyright mb-0 py-3 text-center">
              <Link rounded onClick={this.toggle(2)} to="#">
                &copy;
              </Link>{" "}
              {new Date().getFullYear()} Copyright: ArTech - Orel, Coral & Nadav
            </p>

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
                    onChange={ (e) => this.handleUsernameChange(e) }
                  />
                  <MDBInput
                    label="סיסמא"
                    group
                    type="password"
                    validate
                    containerClass="mb-0"
                    className="admin-name-pass"
                    value={this.state.password} 
                    onChange={ (e) => this.handlePasswordChange(e) }
                  />
                  <div className="text-center mb-3 pr-5 pl-5">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      onClick={() => {this.loginAccount()}}
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
