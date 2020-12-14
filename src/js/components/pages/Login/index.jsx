import React from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col, Jumbotron, Card, CardBody } from 'reactstrap';
import { login } from '../../../api/user';
import "../../../../assets/stylesheets/styles.css";
import CommonAlert from '../../commonComponents/Alert';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            alertShow: false,
            alertMessage: '',
            toggle: false,
        }

    }
    onInputChange = (val, key) => {
        this.setState({
            [key]: val,
        })
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
            }, 5000);
        })
    }

    onSubmitLogin = (e) => {
        e.preventDefault();
        if (this.state.username === "" || this.state.password === "") {
            this.setAlert("Please provide email and password", "danger")
        } else {
            let body = {
                email: this.state.email.trim(),
                password: this.state.password.trim()
            }
            login(body).then((response) => {
                if (response.status === "SUCCESS" && response.statusCode === 200) {
                    const { access_token } = response.data
                    const userDetails = response.data.userDetails
                    localStorage.setItem('user', JSON.stringify(userDetails))
                    sessionStorage.setItem('token', access_token);
                    this.props.history.push('/home');
                }
            }).catch((error) => {
                this.setState({
                    alertMessage: "Login failed",
                }, () => {
                    this.setAlert()
                })
                this.setAlert(error.message || "An unexpected error occured", "danger")
            })
        }
    }

    toggleType = () => {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }))
    }
    render() {
        const {
            email,
            password, alertColor, alertMessage } = this.state;
        return (
            <div className="login">
                <Container>
                    <Row>
                        <Col />
                        <Col lg="8">
                            <Jumbotron>
                                <h3>
                                    Movie App Login
                                </h3>
                                <hr />
                                <Card>
                                    <CardBody>
                                        <Form className="form" onSubmit={this.onSubmitLogin}>
                                            {
                                                alertMessage &&
                                                <CommonAlert color={alertColor} className="mb-2" message={alertMessage} />
                                            }
                                            <FormGroup className="form-group">
                                                <Input value={email} onChange={(e) => this.onInputChange(e.target.value, 'email')} type="text" name="email" id="email" placeholder="Enter email" />
                                            </FormGroup>
                                            <FormGroup className="form-group">
                                                <Input type="password" value={password} onChange={(e) => this.onInputChange(e.target.value, 'password')} name="password" id="userPassword" placeholder="Enter password" />

                                            </FormGroup>
                                            <Button color="primary" className="btn">Submit</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Jumbotron>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Login;