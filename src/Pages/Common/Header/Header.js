import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../../../logo.png';
import {Link} from "react-router-dom";
import CustomLink from "../CustomLink/CustomLink";

const Header = () => {

    return (
        <>
            <header className="pm-header-area">
                <Navbar collapseOnSelect expand="lg" variant="light" className={'py-3'}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="m-auto">
                                <CustomLink to="/">Home</CustomLink>

                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;