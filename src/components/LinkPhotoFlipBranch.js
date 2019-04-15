import React, { Component } from "react";
import {
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardUp,
  MDBAvatar,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBBtn,
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
    const branchSize = 130;
    const { mador_name, front_text, back_text } = this.props;
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
              {/* <MDBCardUp>
                  <img
                    className="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Others/photo7.jpg"
                    alt=""
                  />
                </MDBCardUp> */}
              <MDBCardImage
                cascade
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg"
              />

              <MDBCardBody cascade>
                <MDBCardTitle className="font-weight-bold mb-3">
                  {/* get the name of the MADOR from props - pass props to components in React */}
                  {this.props.mador_name}
                </MDBCardTitle>
                <MDBCardText>{this.props.front_text}</MDBCardText>

                <a
                  href="#!"
                  className="rotate-btn"
                  data-card="card-1"
                  onClick={this.handleFlipping}
                >
                  <MDBIcon icon="redo" /> קרא עוד עלינו
                </a>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="face back">
              <MDBCardBody>
                <h4 className="font-weight-bold">קצת עלינו ...</h4>
                <hr />
                <p>{this.props.back_text}</p>
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
