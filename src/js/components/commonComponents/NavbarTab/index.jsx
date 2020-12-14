import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import ConfirmationModal from '../ConfirmationModal'

class NavbarTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            user: {},
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
                user,
            })
        }
    }

    toggle = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }))
    }

    confirmLogout = () => {
        this.confirmationModalShow("Are you sure want to log out?", "Logout", this.logout)
    }

    confirmationModalShow = (modalMessage, modalTitle, modalConfirmation) => {
        this.setState({
            modalShow: true,
            modalMessage,
            modalTitle,
            modalConfirmation,
        })
    }

    logout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('token')
        localStorage.removeItem('user')
        this.props.history.push("/login")
    }

    modalClose = () => {
        this.setState({
            modalShow: false,
        })
    }
    render() {
        const { isOpen, user, modalShow, modalTitle, modalMessage, modalConfirmation } = this.state
        return (
            <div><Navbar color="light" light expand="md">
                <NavbarBrand>Movie App</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {user.name}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem type="submit" className="btn-primary" onClick={this.confirmLogout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
                <ConfirmationModal isOpen={modalShow} close={this.modalClose} confirm={modalConfirmation} message={modalMessage} title={modalTitle} />
            </div>
        )
    }
}

export default NavbarTab
