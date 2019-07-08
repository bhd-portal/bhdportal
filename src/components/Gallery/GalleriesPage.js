import React, { Component } from "react";
import {MDBRow, MDBCol, MDBView, MDBMask, MDBCard, MDBNav, MDBTabContent} from "mdbreact";
import { Link } from "react-router-dom";
import "../../assets/Lightbox.css";
import HeaderImage from "../HeaderImage";
import {GalleryRef, RootUrl, GalleryBackground} from "../constants"
import NavComponent from "../NavComponent";
import Axios from "axios";

class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: []
        };
    }

    getAlbumsPictures = (albums) => {
        let new_albums = albums;
        for (let i = 0; i < new_albums.length; i++) {
            Axios.get(`${RootUrl}/picture`, {
                params: {
                    'album_id': new_albums[i]._id
                }
            }).then(res => {
                new_albums[i].pictures = res.data.pictures
            }).catch(err => {
                this.setState({error: err});
            });
        }
        this.setState({albums: new_albums});
    };

    componentDidMount() {
        Axios.get(`${RootUrl}/album`, {
            params: {category_id: this.props.category_id}
        }).then(response => {
            this.getAlbumsPictures(response.data.albums)
        });
    }

    render() {
        return (
            <AlbumBlocks
                albums={this.state.albums}
            />
        )
    };
}

const AlbumBlocks = ({ albums }) => {
  const album_list = albums.map(({ _id, name }, index) => {
    return (
      <MDBCol className="col-3 products-col">
        <Link to={`/gallery/${_id}`}>
          {" "}
          <div class="card card-cascade mb-4 ">
            <div class="view view-cascade overlay mb-3">
              <MDBView hover zoom>
                <MDBMask className="flex-center">
                  <p className="white-text">Zoom effect</p>
                </MDBMask>
              </MDBView>
                <img className="card-img-top" src={require('../../assets/gallery_background.jpg')} alt="Card image cap" />
              <a>
                <div class="mask rgba-white-slight waves-effect waves-light" />
              </a>
            </div>

            <div class="card-body card-body-cascade text-center">
              <h4 class="card-title">
                <strong>{name}</strong>
              </h4>
            </div>
          </div>
        </Link>
      </MDBCol>
    );
  });
  return (
    <MDBCard style={{ padding: "20px" }}>
      <MDBRow center className="products-row">
        {album_list}
      </MDBRow>
    </MDBCard>
  );
};

class GalleriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <HeaderImage
          imageLink={require('../../assets/gallery_background.jpg')}
          title="גלריית התמונות"
        />
        <NavComponent
          page_ref={GalleryRef}
          // render works with _id as a parameter,
            // so we need to the function to get the albums from this `_id` in categories
          render={category_id => <Albums category_id={category_id} />}
        />
      </React.Fragment>
    );
  }

}
export default GalleriesPage;
