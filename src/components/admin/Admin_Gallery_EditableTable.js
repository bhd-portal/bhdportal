import React, {Component} from "react";
import {
    MDBCard,
    MDBCollapseHeader,
    MDBCardBody,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBCollapse,
    MDBCol,
    MDBRow,
    MDBView,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBBtn,
    toast
} from "mdbreact";
import Toaster from "../Toaster";
import "./Admin_ABGuidance_EditableTable.css";
import "./Editable_Gallery.css";
import Axios from "axios";
import {RootUrl} from "../constants";

class Admin_Gallery_EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: "",
            name: "",
            icon: "",
            editModal: false,
            focused_index: undefined,
            deleteModal: false,
            albums: [],

            pictures: [
                "https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(63).jpg",
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(66).jpg",
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(65).jpg",
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(67).jpg",
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(68).jpg",
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(64).jpg",
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(69).jpg",
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(59).jpg",
                "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
            ]
        };

        this.getAlbums();
    }

    getAlbums = () => {
        Axios.get(`${RootUrl}/album`, {
            params: {category_id: this.props.category_id}
        })
            .then(res => {
                    this.getAlbumsPictures(res.data.albums);
                }
            )
            .catch(({error}) => {
                this.setState({error, isLoading: false});
            });
    };

    getAlbumsPictures = (albums) => {
        let new_albums = albums;
        for (let i = 0; i < new_albums.length; i++) {
            new_albums[i].pictures = []
            Axios.get(`${RootUrl}/picture`, {
                params: {
                    'album_id': new_albums[i]._id
                }
            }).then(res => {
                new_albums[i].pictures = res.data.pictures
            }).catch(err => {
                this.setState({error: err, isLoading: false});
            });
        }
        this.setState({ albums: new_albums, isLoading: false });
    };

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleToggle = (
        modal,
        focused_index = undefined,
    ) => e => {
        this.setState({[modal]: !this.state[modal], focused_index});
        if (modal === "editModal") {
            if (focused_index !== undefined) {
                this.setState(this.state.albums[focused_index]);
            } else {
                this.setState({name: "", icon: ""});
            }
        }
    };

    renderEditableName = (name, index) => {
        return (
            <React.Fragment>
                <div className="edit-content">
                    <div className="edit-buttons">
                        <MDBIcon
                            className="edit-button"
                            icon="edit"
                            size="sm"
                            style={{marginLeft: "5px"}}
                            onClick={this.handleToggle("editModal", index)}
                        />
                        <MDBIcon
                            className="remove-button"
                            icon="times"
                            size="sm"
                            onClick={this.handleToggle("deleteModal", index)}
                        />
                    </div>
                    <h5
                        className="text-right mr-4 ml-4"
                        onClick={this.toggleCollapse(index)}
                    >
                        {name}{" "}
                    </h5>
                </div>
            </React.Fragment>
        );
    };

    handleEditAlbum = e => {
        const {category_id} = this.props;
        const {focused_index, albums, name, icon} = this.state;
        if (focused_index !== undefined) {
            Axios.patch(`${RootUrl}/album`, {
                category_id,
                id: albums[focused_index]._id,
                name,
                icon,
            })
                .then(res => {
                    albums[focused_index] = res.data.album;
                    // Initialize album
                    albums[focused_index].pictures = []
                    this.setState({albums, isLoading: false});
                    toast.info("אלבום עודכן בהצלחה!");
                })
                .catch(err => {
                        this.setState({error: err, isLoading: false});
                        this.handleToggle("editModal")(e);
                        toast.error("עדכון אלבום נכשל!");
                    }
                );
        } else {
            const data = new FormData();
            data.append("name", name);

            Axios.post(`${RootUrl}/album`, {
                name,
                icon,
                category_id
            })
                .then(res => {
                    albums.push(res.data.album);

                    this.setState({albums, isLoading: false});
                    toast.info("אלבום נוסף בהצלחה!");
                })
                .catch(error => {
                    this.handleToggle("editModal")(e);
                    this.setState({error});
                    toast.error(" הוספת אלבום נכשלה!");
                    return;
                });
        }
        this.handleToggle("editModal")(e);
    };

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    handleDeleteAlbum = e => {
        const {focused_index, albums} = this.state;

        if (focused_index !== undefined) {
            const id = albums[focused_index]._id;
            Axios.delete(`${RootUrl}/album`, {
                params: {
                    id
                }
            })
                .then(res => {
                    this.setState({
                        albums: albums.filter(elem => elem._id !== id),
                        isLoading: false
                    })
                    toast.info("אלבום נמחק בהצלחה!");
                })
                .catch(err => {
                    this.setState({error: err, isLoading: false});
                    this.handleToggle("deleteModal")(e);
                    toast.error("מחיקת אלבום נכשלה!");
                });
            this.handleToggle("deleteModal")(e);
        }
    };

    renderPictures = (album_index) => {
        const {albums} = this.state;
        return albums[album_index].pictures.map(({ file_id }, index) => {
            const href = new URL(`${RootUrl}/file`);
            href.searchParams.append('id', file_id);
            return (
                <MDBCol md="4">
                    <figure>
                        <MDBView hover zoom className="picture-view">
                            <img
                                src={href}
                                style={{cursor: "default"}}
                                alt="Gallery"
                                className="img-fluid"
                            />
                            <div className="gallery-edit-buttons">
                                <MDBIcon
                                    className="remove-button"
                                    icon="times"
                                    onClick={this.handleToggle("deleteModal", album_index, index)}
                                />
                            </div>
                        </MDBView>
                    </figure>
                </MDBCol>
            );
        });
    };


    renderAlbums() {
        return this.state.albums.map(({name}, index) => {
            return (
                <MDBCard className="mt-3">
                    <MDBCollapseHeader className="text-right editable">
                        {this.renderEditableName(name, index)}
                        <i
                            className={
                                this.state.collapseID === index
                                    ? "fa fa-angle-down rotate-icon ml-3"
                                    : "fa fa-angle-down ml-3"
                            }
                        />
                    </MDBCollapseHeader>
                    <MDBCollapse id={index} isOpen={this.state.collapseID}>
                        <MDBCardBody className="text-right">
                            <MDBRow>{this.renderPictures(index)}</MDBRow>
                        </MDBCardBody>
                    </MDBCollapse>
                </MDBCard>
            );
        });
    };

    render() {
        const albums = this.renderAlbums()
        return (
            <React.Fragment>
                <MDBRow center style={{direction: "rtl"}}>
                    <MDBCol>
                        <div>
                            <MDBBtn size="sm" style={{marginBottom: "15px"}} type="button"
                                    onClick={this.handleToggle("editModal")}>
                                <MDBIcon
                                    icon="plus"
                                    size="lg"
                                    style={{
                                        color: "green",
                                        cursor: "pointer",
                                        marginLeft: "15px"
                                    }}
                                />
                                <h5 style={{display: "inline-block"}}>הוסף אלבום</h5>
                            </MDBBtn>
                        </div>
                        <MDBCard>
                            <MDBContainer className="md-accordion mt-0">
                                {albums}
                            </MDBContainer>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBModal
                    className="form-elegant"
                    isOpen={this.state.editModal}
                    toggle={this.handleToggle("editModal")}
                >
                    <MDBModalBody className="mx-3">
                        <section className="form-elegant">
                            <div className="text-center">
                                <h1 className="dark-grey-text mb-5">
                                    <strong>ערוך אלבום</strong>
                                </h1>
                            </div>

                            <MDBInput
                                name="name"
                                onChange={this.handleChange}
                                label="שם"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                value={this.state.name}
                            />
                            <MDBInput
                                name="icon"
                                onChange={this.handleChange}
                                label="הזן שם צלמית"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                value={this.state.icon}
                            />
                            <div className="mb-3 pr-5 pl-5">
                                <MDBBtn type="button" onClick={this.handleToggle("editModal")}>
                                    <MDBIcon icon="times" size="lg"/>
                                </MDBBtn>
                                <MDBBtn
                                    type="button"
                                    color="green"
                                    onClick={this.handleEditAlbum}
                                >
                                    <MDBIcon icon="save" size="lg"/>
                                </MDBBtn>
                            </div>
                        </section>
                    </MDBModalBody>
                </MDBModal>
                <MDBModal
                    className="form-elegant "
                    isOpen={this.state.deleteModal}
                    toggle={this.handleToggle("deleteModal")}
                >
                    <MDBModalBody style={{textAlign: "center"}}>
                        <h4>
                            האם אתה בטוח שאתה רוצה למחוק? <br/>
                            <strong style={{fontWeight: "900"}}>
                                אין דרך לשחזר פעולה זאת!
                            </strong>
                        </h4>
                        <br/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={this.handleToggle("deleteModal")}>ביטול</MDBBtn>
                        <MDBBtn color="red" onClick={this.handleDeleteAlbum}>
                            מחיקה
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                <Toaster/>
            </React.Fragment>
        );

    }
};
export default Admin_Gallery_EditableTable;
