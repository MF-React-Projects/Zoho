import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../../../logo.png';
import {Link} from "react-router-dom";
import CustomLink from "../CustomLink/CustomLink";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import {signOut} from 'firebase/auth';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    };
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
                                {
                                    user ?
                                        <>
                                            <CustomLink to="/manage-inventories">Manage Inventories</CustomLink>
                                            <CustomLink to='/product/add'>Add Product</CustomLink>
                                            <CustomLink to='/my-products'>My Products</CustomLink>
                                        </>
                                        :
                                        ''
                                }
                                <CustomLink to="/blogs">Blogs</CustomLink>
                            </Nav>
                            <div className="pm-header-right">
                                {
                                    user ?
                                        <button className='btn-default btnSm' onClick={handleSignOut}>Logout</button>
                                        :
                                        <>
                                            <Link to={'/login'} className='btn-default btnSm'>Login</Link>
                                            <Link to={'/register'}
                                                  className='btn-default btn-secondary ms-3 btnSm'>Register</Link>
                                        </>
                                }
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;