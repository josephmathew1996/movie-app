import React from 'react';
import { Redirect } from 'react-router-dom';

const isLoggedIn = (ComposedComponent, path) => {
    return class AuthCheck extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                tokenPresent: false,
                checkComplete: false,
            }
        }
        componentDidMount = () => {
            this.checkToken();
        }

        checkToken = () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                this.setState({
                    tokenPresent: true,
                    checkComplete: true,
                })
            } else {
                this.setState({
                    tokenPresent: false,
                    checkComplete: true,
                }, () => {
                    localStorage.removeItem('user')
                })
            }
        }

        render() {
            const { tokenPresent, checkComplete } = this.state;
            if (checkComplete) {
                if (path === '/login') {
                    if (tokenPresent) {
                        // console.log("condition 1")
                        return <Redirect to="/home" />
                    } else {
                        // console.log("condition 2")
                        return <ComposedComponent {...this.props} />
                    }
                }
                if (tokenPresent) {
                    // console.log("condition 3")
                    return <ComposedComponent {...this.props} />;
                }
                // console.log("condition 4")
                return <Redirect to="/login" />
            } else {
                return null;
            }
        }
    }

}

export default isLoggedIn;