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
import Dragzone from "./Dragzone";

class Admin_Gallery_EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: "",

            album_name: "",
            picture_name: "",
            file_id: undefined,

            album_focused_index: undefined,
            picture_focused_index: undefined,
            editAlbumModal: false,
            deleteModal: false,
            editPictureModal: false,
            deletePictureModal: false,
            albums: [],
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
        this.setState({albums: new_albums, isLoading: false});
    };

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleFiles = files => {
        this.setState({file: files[0]});
    };

    handleToggle = (
        modal,
        album_focused_index = undefined,
        picture_focused_index = undefined,
    ) => e => {
        this.setState({[modal]: !this.state[modal], album_focused_index, picture_focused_index});
        if (modal === "editAlbumModal") {
            if (album_focused_index !== undefined) {
                this.setState({album_name: this.state.albums[album_focused_index].name});
            } else {
                this.setState({album_name: ""});
            }
        }
        if (modal === "editPPictureModal") {
            if (album_focused_index !== undefined && picture_focused_index !== undefined) {
                this.setState({
                    picture_name: this.state.albums[album_focused_index].pictures[picture_focused_index].name,
                    file_id: this.state.albums[album_focused_index].pictures[picture_focused_index].file_id
                });
            } else {
                this.setState({picture_name: "", file_id: ""});
            }
        }
    };

    handleEditAlbum = e => {
        const {category_id} = this.props;
        const {album_focused_index, albums, album_name} = this.state;
        if (album_focused_index !== undefined) {
            Axios.patch(`${RootUrl}/album`, {
                category_id,
                id: albums[album_focused_index]._id,
                name: album_name,
            })
                .then(res => {
                    // Save albums pictures
                    let pictures = albums[album_focused_index].pictures
                    albums[album_focused_index] = res.data.album;
                    // Set albums pictures again
                    albums[album_focused_index].pictures = pictures

                    this.setState({albums, isLoading: false});
                    toast.info("אלבום עודכן בהצלחה!");
                })
                .catch(err => {
                        this.setState({error: err, isLoading: false});
                        this.handleToggle("editAlbumModal")(e);
                        toast.error("עדכון אלבום נכשל!");
                    }
                );
        } else {
            // If we are adding a new album this will be running
            Axios.post(`${RootUrl}/album`, {
                name: album_name,
                category_id
            })
                .then(res => {
                    albums.push(res.data.album);

                    this.setState({albums, isLoading: false});
                    toast.info("אלבום נוסף בהצלחה!");
                })
                .catch(error => {
                    this.handleToggle("editAlbumModal")(e);
                    this.setState({error});
                    toast.error(" הוספת אלבום נכשלה!");
                    return;
                });
        }
        this.handleToggle("editAlbumModal")(e);
    };


    handleEditPicture = e => {
        const {album_focused_index, picture_focused_index, albums, picture_name, file} = this.state;
        if (album_focused_index !== undefined && picture_focused_index !== undefined) {
            if (file) {
                //save the file_id of the previous file
                const old_file_id = albums[album_focused_index].pictures[picture_focused_index].file_id;
                const data = new FormData();
                data.append("file", this.state.file);
                data.append("filename", this.state.file.name);
                data.append("category", "gallery");
                Axios.post(`${RootUrl}/file`, data)
                    .then(res => {
                        const file_id = res.data.id;
                        Axios.patch(`${RootUrl}/picture`, {
                            id: albums[album_focused_index].pictures[picture_focused_index]._id,
                            name: picture_name,
                            album_id: albums[album_focused_index]._id,
                            file_id
                        })
                            .then(res => {
                                albums[album_focused_index].pictures[picture_focused_index] = res.data.picture;

                                this.setState({albums, isLoading: false});
                                toast.info(",תמונה עודכנה בהצלחה!");
                                //after success, delete the previous file
                                Axios.delete(`${RootUrl}/file`, {
                                    params: {
                                        'id': old_file_id
                                    }
                                })
                                    .then(res => {
                                        if (res.status != 200) {
                                            toast.error("נכשל במחיקת הקובץ הקודם!");
                                        }
                                    })
                            })
                            .catch(err => {
                                this.setState({error: err, isLoading: false});
                                toast.error("עדכון תמונה נכשל!");
                            });
                    });
            } else {
                const {file_id} = this.state;
                Axios.patch(`${RootUrl}/picture`, {
                    id: albums[album_focused_index].pictures[picture_focused_index]._id,
                    name: picture_name,
                    album_id: albums[album_focused_index]._id,
                    file_id
                })
                    .then(res => {
                        albums[album_focused_index].pictures[picture_focused_index] = res.data.picture;

                        this.setState({albums, isLoading: false});
                        toast.info("תמונה עודכנה בהצלחה!");
                    })
                    .catch(err => {
                        this.setState({error: err, isLoading: false});
                        toast.error("עדכון תמונה נכשל!");
                    });
            }
        } else {
            if (!file) {
                toast.error("קובץ חסר, הוספת תמונה נכשלה!");
            } else {
                const data = new FormData();
                data.append("file", this.state.file);
                data.append("filename", this.state.file.name);
                data.append("category", "gallery");
                Axios.post(`${RootUrl}/file`, data)
                    .then(res => {
                        const file_id = res.data.id;
                        Axios.post(`${RootUrl}/picture`, {
                            name: picture_name,
                            album_id: albums[album_focused_index]._id,
                            file_id
                        })
                            .then(res => {
                                // If this is the first picture in the album it must be locally initialized
                                if (albums[album_focused_index].pictures === undefined) {
                                    albums[album_focused_index].pictures = []
                                }
                                albums[album_focused_index].pictures.push(res.data.picture);

                                this.setState({albums, isLoading: false});
                                toast.info("תמונה נוספה בהצלחה!");
                            })
                            .catch(err => {
                                this.setState({error: err, isLoading: false});
                                toast.error(" הוספת תמונה נכשלה!");
                            });
                    })
                    .catch(error => {
                        this.setState({error});
                        toast.error(" הוספת תמונה נכשלה!");
                    });
            }
        }
        this.handleToggle("editPictureModal")(e);
    };

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    deletePicture(picture, set_toast=true) {
        Axios.delete(`${RootUrl}/picture`, {
            params: {
                id: picture._id
            }
        })
            .then(res => {
                Axios.delete(`${RootUrl}/file`, {
                    params: {
                        'id': picture.file_id
                    }
                }).then(res => {
                    if (set_toast){
                        if (res.status != 200) {
                            toast.error("נכשל במחיקת הקובץ!");
                        } else {
                            toast.info("תמונה נמחקה בהצלחה!");
                        }
                    }
                })
            })
            .catch(err => {
                this.setState({error: err, isLoading: false});
                if (set_toast) {
                    toast.error("מחיקת תמונה נכשלה!");
                }
            })
    }

    handleDeleteAlbum = e => {
        const {album_focused_index, albums} = this.state;

        if (album_focused_index !== undefined) {
            const id = albums[album_focused_index]._id;
            Axios.delete(`${RootUrl}/album`, {
                params: {
                    id
                }
            })
                .then(res => {
                    // Delete all albums pictures
                    const pictures = albums[album_focused_index].pictures
                    if (pictures) {
                        for (let i = 0; i < pictures.length; i++) {
                            this.deletePicture(pictures[i], false)
                        }
                    }

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

    handleDeletePicture = e => {
        const {album_focused_index, picture_focused_index, albums} = this.state;

        if (album_focused_index !== undefined && picture_focused_index !== undefined) {
            const id = albums[album_focused_index].pictures[picture_focused_index]._id;

            this.deletePicture(albums[album_focused_index].pictures[picture_focused_index])
            albums[album_focused_index].pictures = albums[album_focused_index].pictures.filter(elem => elem._id !== id)
            this.handleToggle("deletePictureModal")(e);
            /*
            Axios.delete(`${RootUrl}/picture`, {
                params: {
                    id
                }
            })
                .then(res => {
                    albums[album_focused_index].pictures = albums[album_focused_index].pictures.filter(elem => elem._id !== id)
                    this.setState({
                        albums: albums,
                        isLoading: false
                    });
                    Axios.delete(`${RootUrl}/file`, {
                        params: {
                            'id': file_id
                        }
                    }).then(res => {
                        if (res.status != 200) {
                            toast.error("נכשל במחיקת הקובץ!");
                        } else {
                            toast.info("תמונה נמחקה בהצלחה!");
                        }
                    })
                })
                .catch(err => {
                    this.setState({error: err, isLoading: false});
                    toast.error("מחיקת תמונה נכשלה!");
                }).finally(() => {
                this.handleToggle("deletePictureModal")(e);
            })*/
        }
    };

    renderEditableName = (name, index) => {
        return (
            <React.Fragment>
                <div className="edit-content">
                    <div className="edit-buttons">
                        <MDBIcon
                            className="edit-button"
                            icon="plus"
                            size="sm"
                            onClick={this.handleToggle("editPictureModal", index)}
                        />
                        <MDBIcon
                            className="edit-button"
                            icon="edit"
                            size="sm"
                            style={{marginLeft: "5px"}}
                            onClick={this.handleToggle("editAlbumModal", index)}
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

    renderPictures = (album_index) => {
        const {albums} = this.state;

        // If no pictures are defined for the album, return
        if (albums[album_index].pictures === undefined) {
            return []
        }
        return albums[album_index].pictures.map(({file_id, name}, index) => {
            const href = new URL(`${RootUrl}/file`);
            href.searchParams.append('id', file_id);
            return (
                <MDBCol md="4">
                    <figure>
                        <h5 align="center" className="dark-grey-text mb-3"> {name} </h5>
                        <div className="gallery-edit-buttons">
                            <MDBIcon
                                className="edit-button ml-2"
                                icon="edit"
                                size="sm"
                                onClick={this.handleToggle("editPictureModal", album_index, index)}
                            />
                            <MDBIcon
                                className="remove-button  ml-3"
                                icon="times"
                                size="sm"
                                onClick={this.handleToggle("deletePictureModal", album_index, index)}
                            />
                        </div>
                        <MDBView hover zoom className="picture-view">
                            <img
                                src={href}
                                style={{cursor: "default"}}
                                alt="Gallery"
                                className="img-fluid"
                            />
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
                                    onClick={this.handleToggle("editAlbumModal")}>
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

                {this.getMDBModals()}

                <Toaster/>
            </React.Fragment>
        );
    }

    getMDBModals() {
        return (
            <React.Fragment>
                <MDBModal
                    className="form-elegant"
                    isOpen={this.state.editAlbumModal}
                    toggle={this.handleToggle("editAlbumModal")}
                >
                    <MDBModalBody className="mx-3">
                        <section className="form-elegant">
                            <div className="text-center">
                                <h1 className="dark-grey-text mb-5">
                                    <strong>ערוך אלבום</strong>
                                </h1>
                            </div>

                            <MDBInput
                                name="album_name"
                                onChange={this.handleChange}
                                label="שם"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                value={this.state.album_name}
                            />
                            <div className="mb-3 pr-5 pl-5">
                                <MDBBtn type="button" onClick={this.handleToggle("editAlbumModal")}>
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
                    className="form-elegant"
                    isOpen={this.state.editPictureModal}
                    toggle={this.handleToggle("editPictureModal")}
                >
                    <MDBModalBody className="mx-3">
                        <section className="form-elegant">
                            <div className="text-center">
                                <h1 className="dark-grey-text mb-5">
                                    <strong>ערוך תמונה</strong>
                                </h1>
                            </div>

                            <MDBInput
                                name="picture_name"
                                onChange={this.handleChange}
                                label="שם"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                value={this.state.picture_name}
                            />
                            <Dragzone
                                handleFiles={this.handleFiles}
                                file={this.state.file}
                                file_id={this.state.file_id}
                            />
                            <div className="mb-3 pr-5 pl-5">
                                <MDBBtn type="button" onClick={this.handleToggle("editPictureModal")}>
                                    <MDBIcon icon="times" size="lg"/>
                                </MDBBtn>
                                <MDBBtn
                                    type="button"
                                    color="green"
                                    onClick={this.handleEditPicture}
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

                <MDBModal
                    className="form-elegant "
                    isOpen={this.state.deletePictureModal}
                    toggle={this.handleToggle("deletePictureModal")}
                >
                    <MDBModalBody style={{textAlign: "center"}}>
                        <h4>
                            האם אתה בטוח שאתה רוצה למחוק את התמונה? <br/>
                            <strong style={{fontWeight: "900"}}>
                                אין דרך לשחזר פעולה זאת!
                            </strong>
                        </h4>
                        <br/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={this.handleToggle("deletePictureModal")}>ביטול</MDBBtn>
                        <MDBBtn color="red" onClick={this.handleDeletePicture}>
                            מחיקה
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        )
    }
};
export default Admin_Gallery_EditableTable;
