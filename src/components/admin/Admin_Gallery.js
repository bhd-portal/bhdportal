import React, { Component } from "react";
import EditableNav from "./EditableNav";
import Admin_Gallery_EditableTable from "./Admin_Gallery_EditableTable";
import {GalleryRef} from "../constants";
import Admin_Ppt_EditableTable from "./Admin_Ppt_EditableTable";

class Admin_Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <h1 className="h1-title mb-4 text-center">ניהול גלריית התמונות</h1>
        <EditableNav
            page_ref={GalleryRef}
            render={category_id => (
                <Admin_Gallery_EditableTable category_id={category_id} />
            )}
        />
      </React.Fragment>
    );
  }
}
export default Admin_Gallery;
