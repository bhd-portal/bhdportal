import React, { Component } from "react";
import { MDBRow, MDBCol, MDBView, MDBMask, MDBCard } from "mdbreact";
import { Link } from "react-router-dom";
import "../assets/Lightbox.css";
import HeaderImage from "./HeaderImage";
import NavComponent from "./NavComponent";

const Albums = ({ albums }) => {
  const album_list = albums.map(({ _id, name, image }, index) => {
    return (
      <MDBCol className="col-3 products-col">
        <Link to={`/gallery/${_id}`}>
          {" "}
          <div class="card card-cascade mb-4 ">
            <div class="view view-cascade overlay mb-3">
              <MDBView hover zoom>
                <img class="card-img-top" src={image} alt="Card image cap" />
                <MDBMask className="flex-center">
                  <p className="white-text">Zoom effect</p>
                </MDBMask>
              </MDBView>

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
      categories: [
        {
          _id: "1",
          name: "בטיחות",
          albums: [
            {
              _id: "1",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "2",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "3",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "4",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            }
          ]
        },
        {
          _id: "2",
          name: "דת",
          albums: [
            {
              _id: "1",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "2",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "3",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "4",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            }
          ]
        },
        {
          _id: "3",
          name: 'ת"ש',
          albums: [
            {
              _id: "1",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "2",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "3",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "4",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            }
          ]
        },
        {
          _id: "4",
          name: "שלישות",
          albums: [
            {
              _id: "1",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "2",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "3",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "4",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            }
          ]
        },
        {
          _id: "5",
          name: "בטחון מידע",
          albums: [
            {
              _id: "1",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "2",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "3",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            },
            {
              _id: "4",
              name: 'בה"ד 15 פורים 2019',
              image:
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <HeaderImage
          imageLink="https://mdbootstrap.com/img/Photos/Slides/img%20(135).jpg"
          title="גלריית התמונות"
        />
        <NavComponent
          page_id="5ca4bd85d4ff14140cc2c92f"
          categories={this.state.categories}
          // render works with _id as a parameter,
            // so we need to the function to get the albums from this `_id` in categories
          render={_id => <Albums albums={this._get_albums(_id)} />}
        />
      </React.Fragment>
    );
  }

   _get_albums(_id) {
      for(var index in this.state.categories) {
          if(this.state.categories[index]._id === _id) {
              return this.state.categories[index].albums
          }
      }
    }

}
export default GalleriesPage;
