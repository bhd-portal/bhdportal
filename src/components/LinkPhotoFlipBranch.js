import React, { Component } from "react";
import {
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCol,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBRotatingCard
} from "mdbreact";

class LinkPhotoFlipBranch extends Component {
  state = {
    flipped: false
  };

  handleFlipping = () => {
    this.setState({ flipped: !this.state.flipped });
  };
  render() {
    const colStyle = { maxWidth: "22rem" };

    return (
      <React.Fragment>
        <MDBCol style={{ minHeight: "26rem" }}>
          <MDBRotatingCard
            flipped={this.state.flipped}
            className="text-center h-100 w-100"
            style={colStyle}
          >
            <MDBCard className="cascade face front">
              <MDBCardImage
                cascade
                className="img-fluid"
                src={this.props.imageURL}
              />

              <MDBCardBody cascade>
                <MDBCardTitle className="font-weight-bold mb-3">
                  {console.log(this.props.link)}
                  <a
                    href={this.props.link == "" ? "#" : this.props.link}
                    className="rotate-btn"
                    data-card="card-1"
                    target={this.props.link == "" ? "_self" : "_blank"}
                  >
                    {this.props.name}
                  </a>
                </MDBCardTitle>
                <MDBCardText>{this.props.description}</MDBCardText>
                <div style={{ cursor: "pointer", color: "#2196f3 " }}>
                  <MDBIcon icon="redo" onClick={this.handleFlipping} />{" "}
                  <span onClick={this.handleFlipping}>קרא עוד עלינו</span>
                </div>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="face back">
              <MDBCardBody>
                <h4 className="font-weight-bold">קצת עלינו ...</h4>
                <hr />
                <p>{this.props.content}</p>
                <hr />

                <a
                  href="#!"
                  className="rotate-btn"
                  data-card="card-1"
                  onClick={this.handleFlipping}
                >
                  <MDBIcon icon="undo" /> חזור
                </a>
              </MDBCardBody>
            </MDBCard>
          </MDBRotatingCard>
        </MDBCol>
      </React.Fragment>
    );
  }
}
export default LinkPhotoFlipBranch;
