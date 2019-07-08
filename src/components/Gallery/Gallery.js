import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol, MDBView } from "mdbreact";
import Lightbox from "react-image-lightbox";
import {RootUrl} from "../constants";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderImages = pictures => {
    let photoIndex = -1;
    return pictures.map(({file_id, name}) => {
      const href = new URL(`${RootUrl}/file`);
      href.searchParams.append('id', file_id);
      photoIndex++;
      const privateKey = photoIndex;
      return (
        <MDBCol md="4" key={photoIndex}>
          <figure>
            <MDBView hover zoom>
              <h4 class="dark-grey-text mb-3"> {name} </h4>
              <img
                src={href}
                style={{ cursor: "default" }}
                alt="Gallery"
                className="img-fluid"
                onClick={() =>
                  this.setState({ photoIndex: privateKey, isOpen: true })
                }
              />
            </MDBView>
          </figure>
        </MDBCol>
      );
    });
  };

  render() {
    try {
      this.props.scrollToMyRef();
      console.log("f");
    } catch {}
    const { title, pictures } = this.props;
    const { photoIndex, isOpen } = this.state;
    return (
      <Fragment>
        <h2 className="font-weight-bold mb-5 mt-2 text-center">{title}</h2>
        <div className="mdb-lightbox">
          <MDBRow>{this.renderImages(pictures)}</MDBRow>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={pictures[photoIndex]}
            nextSrc={pictures[(photoIndex + 1) % pictures.length]}
            prevSrc={pictures[(photoIndex + pictures.length - 1) % pictures.length]}
            imageTitle={photoIndex + 1 + "/" + pictures.length}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + pictures.length - 1) % pictures.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % pictures.length
              })
            }
          />
        )}
      </Fragment>
    );
  }
}

export default Gallery;
