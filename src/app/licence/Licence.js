import React, {Component} from 'react';
import Navbar from "react-bootstrap/lib/Navbar.js";
import Nav from "react-bootstrap/lib/Nav.js";
import NavItem from "react-bootstrap/lib/NavItem";

export default class Licence extends Component {

    render() {
        return (
            <div className="licence">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="https://github.com/kazimunalan">Conference Event</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="https://github.com/kazimunalan">kazimunalan.com/kazimunalan</NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }

}