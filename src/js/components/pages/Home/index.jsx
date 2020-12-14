import React, { Component } from 'react'
import { getMovie } from '../../../api/movie'
import Loader from "../../commonComponents/Loader";
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import Pagination from "react-js-pagination";
import CommonAlert from '../../commonComponents/Alert'
import AddMovieModal from './AddMovie'
import EditMovieModal from './EditMovie'
import ConfirmationModal from '../../commonComponents/ConfirmationModal'

import { deleteMovie } from '../../../api/movie'


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: {},
            movies: [],
            pageSelected: 1,
            numberOfPages: 0,
            totalItems: 0,
            // currentPageItems: 0,
            itemsPerPage: 8,
            loading: false,
            alertMessage: '',
            alertColor: '',
            name: '',
            director: '',
            sortby: '',
            toggleAdd: false,
            toggleEdit: false,
            userRole: "",
            movieID: 0,
            movieSelected: {},
            modalShow: false,
            modalMessage: "",
            modalTitle: "",
            modalConfirmation: () => { },
        }
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user === null) {
            sessionStorage.removeItem('token')
            this.props.history.push("/login")
        } else {
            this.setState({
                userRole: user.role
            })
            this.getAllMovies()
        }
    }


    getAllMovies = () => {
        this.setState({
            loading: true
        }, async () => {
            try {
                let params = {};
                params.page = this.state.pageSelected;
                params.count = parseInt(this.state.itemsPerPage);
                params.name = this.state.name
                params.director = this.state.director
                params.sortby = this.state.sortby
                let response = await getMovie(params);
                // console.log("response", response);
                this.setState({
                    movies: response.data.movies,
                    numberOfPages: response.data.noOfPages,
                    totalItems: response.data.total,
                    itemsPerPage: response.data.itemsPerPage,
                    loading: false,
                });
            } catch (error) {
                this.setState({
                    loading: false,
                })
                this.setAlert(error.message || "An unexpected error occured", "danger");
            }
        })
    }

    selectPage = (pageSelected) => {
        this.setState(
            {
                pageSelected,
            },
            () => {
                this.getAllMovies();
            }
        );
    };

    // selectItemsPerPage = (itemsPerPage) => {
    //     this.setState(
    //         {
    //             itemsPerPage,
    //             pageSelected: 1,
    //             loading: true,
    //         },
    //         () => {
    //             this.getDoctorAvailability();
    //         }
    //     );
    // };

    setAlert = (alertMessage, alertColor) => {
        this.setState(
            {
                alertColor,
                alertMessage,
            },
            () => {
                setTimeout(() => {
                    this.setState({
                        alertColor: "",
                        alertMessage: "",
                    });
                }, 3000);
            }
        );
    };


    onChangeHandler = (event, key) => {
        this.setState({
            [key]: event.target.value,
        }, () => {
            this.getAllMovies();

        })
    }

    toggleAdd = () => {
        this.setState((prevState) => ({
            toggleAdd: !prevState.toggleAdd
        }))

    }

    toggleEdit = (movie) => {
        this.setState((prevState) => ({
            toggleEdit: !prevState.toggleEdit
        }), () => {
            if (this.state.toggleEdit) {
                this.setState({
                    movieID: movie.id,
                    movieSelected: movie
                })
            } else {
                this.setState({
                    movieID: 0,
                    movieSelected: {},
                })
            }
        })
    }


    confirmDeleteMovie = (id) => {
        this.setState({
            movieID: id,
        })
        this.confirmationModalShow("Are you sure want to delete this movie?", "Delete Movie", this.deleteMovie)
    }


    confirmationModalShow = (modalMessage, modalTitle, modalConfirmation) => {
        this.setState({
            modalShow: true,
            modalMessage,
            modalTitle,
            modalConfirmation,
        })
    }

    deleteMovie = (e) => {
        e.preventDefault();
        if (this.state.movieID > 0) {
            this.setState({
                loading: true
            }, async () => {
                try {
                    // console.log("movie id", this.state.movieID)
                    await deleteMovie(this.state.movieID)
                    this.setState({
                        loading: false,
                        movieID: 0,
                    })
                    this.getAllMovies()
                    this.modalClose()
                } catch (error) {
                    this.setAlert(error.message || "An unexpected error occured", "danger")
                    this.setState({
                        loading: false,
                    })
                }
            })
        }
    }

    modalClose = () => {
        this.setState({
            modalShow: false,
        })
    }

    render() {
        const { movies, alertColor, alertMessage, loading, itemsPerPage, totalItems, name, director, pageSelected, toggleAdd, userRole, toggleEdit, movieID, movieSelected, modalShow, modalTitle, modalMessage, modalConfirmation } = this.state
        return (
            <div className="home-wrapper">
                {
                    alertMessage &&
                    <CommonAlert color={alertColor} className="mb-2" message={alertMessage} />
                }
                {
                    userRole === "admin" &&
                    <div className="add-button p-2">
                        <button className="btn btn-primary" onClick={this.toggleAdd}>Add Movie</button>
                    </div>
                }
                <br />
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="Select1">Movies per page : </label>
                        <select className="form-control" onChange={(e) => { this.onChangeHandler(e, 'itemsPerPage') }}>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={16}>16</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <label htmlFor="Select1">Search by movie  </label>
                        <input className="form-control" value={name} onChange={(e) => { this.onChangeHandler(e, 'name') }} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="Select1">Search by director </label>
                        <input className="form-control" value={director} onChange={(e) => { this.onChangeHandler(e, 'director') }} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="Select1">Sort by  </label>
                        <select className="form-control" onChange={(e) => { this.onChangeHandler(e, 'sortby') }}>
                            <option value="">Choose</option>
                            <option value="name">Name</option>
                            <option value="director">Director</option>
                        </select>
                    </div>
                </div>
                <div className="container">
                    <h3 className="text-center">Movies</h3>
                    {
                        loading && (
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <Loader color="info" />
                            </div>
                        )}
                    <div className="row mt-5">
                        {
                            !loading && movies && movies.length > 0 &&
                            movies.map((movie, index) => {
                                return (
                                    <div className="col-3 p-2" key={index}>
                                        <Card>
                                            <CardBody>
                                                <CardTitle tag="h5">{movie.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">Directed by {movie.director}</CardSubtitle>
                                                <CardText>Genre : {movie.genre.join(",")}</CardText>
                                                <CardText>Popularity : {movie["99popularity"]}</CardText>
                                                <CardText>IMDB Rating : {movie.imdb_score}</CardText>
                                            </CardBody>
                                            {
                                                userRole === "admin" &&
                                                <>
                                                    <button className="btn btn-outline-primary" onClick={() => this.toggleEdit(movie)}>Edit</button>
                                                    <button className="btn btn-outline-danger" onClick={() => this.confirmDeleteMovie(movie.id)}>Delete</button>

                                                </>
                                            }
                                        </Card>
                                    </div>
                                )
                            })
                        }
                        {
                            movies && movies.length === 0 &&
                            !loading && (
                                <div className="d-flex align-items-center justify-content-center h-100">
                                    <span>No movie found</span>
                                </div>
                            )
                        }
                        {loading && (
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <Loader color="info" />
                            </div>
                        )}
                    </div>
                </div>
                {
                    !loading && movies && movies.length > 0 &&
                    <Pagination className="pagination"
                        activePage={pageSelected}
                        itemsCountPerPage={parseInt(itemsPerPage)}
                        totalItemsCount={totalItems}
                        pageRangeDisplayed={5}
                        onChange={this.selectPage}
                    />
                }
                {
                    toggleAdd &&
                    <AddMovieModal isOpen={toggleAdd} toggle={this.toggleAdd} getAllMovies={this.getAllMovies} />
                }
                {
                    toggleEdit && movieID > 0 && movieSelected &&
                    <EditMovieModal isOpen={toggleEdit} toggle={this.toggleEdit} getAllMovies={this.getAllMovies} movie={movieSelected} movieID={movieID} />
                }
                {
                    modalShow &&
                    <ConfirmationModal isOpen={modalShow} close={this.modalClose} confirm={modalConfirmation} message={modalMessage} title={modalTitle} />
                }
            </div>
        )
    }
}

export default Home
