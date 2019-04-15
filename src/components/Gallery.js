import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol, MDBView } from "mdbreact";
import Lightbox from "react-image-lightbox";

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

  renderImages = images => {
    let photoIndex = -1;

    return images.map(imageSrc => {
      photoIndex++;
      const privateKey = photoIndex;
      return (
        <MDBCol md="4" key={photoIndex}>
          <figure>
            <MDBView hover zoom>
              <img
                src={imageSrc}
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
    const { title, images } = this.props;
    const { photoIndex, isOpen } = this.state;
    return (
      <Fragment>
        <h2 className="font-weight-bold mb-5 mt-2 text-center">{title}</h2>
        <div className="mdb-lightbox">
          <MDBRow>{this.renderImages(images)}</MDBRow>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            imageTitle={photoIndex + 1 + "/" + images.length}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })
            }
          />
        )}
      </Fragment>
    );
  }
}

export default Gallery;
