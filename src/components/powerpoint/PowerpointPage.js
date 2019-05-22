import React, { Component } from "react";
import { MDBRow, MDBCol, MDBCard } from "mdbreact";
import PowerpointBullet from "./Powerpoint";
import NavComponent from "../NavComponent";
import HeaderImage from "../HeaderImage.js";
import { PowerpointRef } from "../constants";
import Axios from "axios";
import { RootUrl } from "../constants";


class Powerpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      powerpoints: []
    };
  }

  componentDidMount() {
    Axios.get(`${RootUrl}/powerpoint`, {
      params: { category_id: this.props.category_id }
    }).then(response => {
      this.setState({ powerpoints: response.data.powerpoints });
    });
  }

  render() {
    return (
      <Powerpoints
      powerpoints={this.state.powerpoints}
      />
    );
  }

}
const Powerpoints = ({ powerpoints }) => {
  const powerpointsList = powerpoints.map(powerpoint => {
    return (
      <React.Fragment>
        <MDBCol
          className="mt-4"
          style={{ padding: "25px"}}
        >
          <PowerpointBullet {...powerpoint} />
        </MDBCol>{" "}
      </React.Fragment>
    );
  });
  return (
    <MDBCard>
      <MDBRow center>{powerpointsList}</MDBRow>
    </MDBCard>
  );
};

class PowerpointsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <HeaderImage
          imageLink="https://mdbootstrap.com/img/Photos/Slides/img%20(136).jpg"
          title="מצגות"
        />
        <NavComponent
          page_ref={PowerpointRef}
          render={category_id => <Powerpoint category_id={category_id} />}
        />
      </React.Fragment>
    );
  }
}
export default PowerpointsPage;
