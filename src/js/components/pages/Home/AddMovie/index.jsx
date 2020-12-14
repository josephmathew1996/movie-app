

import React, { Component } from 'react'
import CommonAlert from '../../../commonComponents/Alert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { addMovie } from '../../../../api/movie'

export class AddMovieModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            director: '',
            genres: [
                { value: "Action", isChecked: false },
                { value: "Adventure", isChecked: false },
                { value: "Fantasy", isChecked: false },
                { value: "Sci-Fi", isChecked: false },
                { value: "Family", isChecked: false },
                { value: "Musical", isChecked: false },
                { value: "Drama", isChecked: false },
                { value: "War", isChecked: false },
                { value: "Mystery", isChecked: false },
                { value: "Horror", isChecked: false },
                { value: "Thriller", isChecked: false },
                { value: "Romance", isChecked: false },
            ],
            popularity: '',
            imdbRating: '',
            loading: false,
            alertMessage: '',
            alertColor: '',

        }
    }


    onChangeHandler = (event, key) => {
        this.setState({
            [key]: event.target.value,
        })
    }

    //form submit function
    submitHandler = () => {
        const { name, director, popularity, imdbRating, genres } = this.state
        let genresSelected = []
        genres.forEach((genre) => {
            if (genre.isChecked) {
                genresSelected.push(genre.value)
            }
        })
        if (!name || !director || genresSelected.length === 0) {
            this.setAlert("Please provide all details", "danger")
        } else if (popularity > 100 || popularity < 1) {
            this.setAlert("Popularity should be between 1-100", "danger")
        } else if (imdbRating > 10 || imdbRating < 1) {
            this.setAlert("IMDB score should be between 1-10", "danger")
        } else {
            this.setState({
                loading: true
            }, async () => {
                try {
                    let body = { name, director }
                    body.genre = genresSelected
                    body["99popularity"] = parseFloat(popularity)
                    body.imdb_score = parseFloat(imdbRating)
                    await addMovie(body)
                    this.setState({
                        loading: false,
                    })
                    this.props.getAllMovies()
                    this.props.toggle()
                } catch (error) {
                    this.setAlert(error.message || "An unexpected error occured", "danger")
                    this.setState({
                        loading: false,
                    })
                }
            })
        }
    }

    //alert handler
    setAlert = (alertMessage, alertColor) => {
        this.setState({
            alertMessage,
            alertColor
        }, () => {
            setTimeout(() => {
                this.setState({
                    alertMessage: '',
                    alertColor: '',
                })
            }, 3000);
        })
    }

    checkboxHandler = (event) => {
        let genres = this.state.genres
        genres.forEach(genre => {
            if (genre.value === event.target.value)
                genre.isChecked = event.target.checked
        })
        this.setState({ genres: genres })
    }

    render() {
        const { isOpen,
            toggle,
        } = this.props
        const { name, director, popularity, loading, alertColor, alertMessage, imdbRating, genres } = this.state
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Movie</ModalHeader>
                <ModalBody>
                    {
                        alertMessage &&
                        <CommonAlert color={alertColor} className="mb-2" message={alertMessage} />
                    }
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input value={name} type="text" name="name" id="name" placeholder="Name" onChange={(e) => { this.onChangeHandler(e, 'name') }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="director">Director</Label>
                            <Input value={director} type="text" name="director" id="director" placeholder="Director" onChange={(e) => { this.onChangeHandler(e, 'director') }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="popularity">Popularity</Label>
                            <Input value={popularity} type="number" step="0.1" min={1.0} max={100.0} name="popularity" id="popularity" placeholder="Popularity" onChange={(e) => { this.onChangeHandler(e, 'popularity') }} />
                        </FormGroup> <FormGroup>
                            <Label for="imdbrating">IMDB Rating</Label>
                            <Input value={imdbRating} type="number" step="0.1" min={1} max={10} name="imdbrating" id="imdbrating" placeholder="IMDB Rating" onChange={(e) => { this.onChangeHandler(e, 'imdbRating') }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="genre">Select Genre</Label>
                            <br />
                            {
                                genres.map((genre, index) => {
                                    return (
                                        <Label key={index}>
                                            <input key={index} type="checkbox" onClick={this.checkboxHandler} value={genre.value} defaultChecked={genre.isChecked} /> {genre.value}
                                            <br />
                                        </Label>
                                    )
                                })
                            }
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler} disabled={loading}>Yes</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default AddMovieModal

