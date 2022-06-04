import React from 'react';
import logo from '../../../logo.png';
import {Col, Container, Row} from "react-bootstrap";
import {FaMapMarkerAlt} from "@react-icons/all-files/fa/FaMapMarkerAlt";
import {FaPhone} from "@react-icons/all-files/fa/FaPhone";
import {FaEnvelope} from "@react-icons/all-files/fa/FaEnvelope";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import {signOut} from "firebase/auth";

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();

    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    };

    return (
        <footer className='footer'>
            <div className="footer-top">
                <Container>
                    <Row>
                        <Col md={12} lg={4}>
                            <div className="footer-about">
                                <img src={logo} alt="logo" className="footer-logo mb-4"/>
                                <p>
                                    The number, the industry, and the morality of the priesthood, and the devotion of the people have been manifestly increased by the total separation of the church from the state.
                                </p>
                            </div>
                        </Col>
                        <Col md={6} lg={{span: 3, offset: 2}}>
                            <div className="footer-contact">
                                <h3 className='widget-title'>Contact Us</h3>
                                <p>
                                    <FaMapMarkerAlt className="me-2"/>
                                    <span>Brooklyn, New York, USA</span>
                                </p>
                                <p>
                                    <FaPhone className='me-2'/>
                                    <span>+1 (212) 555-5555</span>
                                </p>
                                <p>
                                    <FaEnvelope className={'me-2'}/>
                                    <span>
                                    admin@demo.com
                                </span>
                                </p>
                            </div>
                        </Col>
                        <Col md={6} lg={3} >
                            <div className="footer-links">
                                <h3 className='widget-title'>Quick Links</h3>
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/blogs">Blogs</Link>
                                    </li>
                                    <li>
                                        <Link to="/my-portfolio">My Portfolio</Link>
                                    </li>
                                    {
                                        user ?
                                            <li>
                                                <button onClick={handleSignOut} className='btn btn-link p-0'>Logout</button>
                                            </li>
                                            :
                                            <>
                                                <li>
                                                    <Link to="/login">Login</Link>
                                                </li>
                                            </>
                                    }

                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-copyright">
                <Container>
                    <Row>
                        <Col md={6} className='mb-2 mb-md-0'>
                            <p>Copyright © {year} All rights reserved.</p>
                        </Col>
                        <Col md={6} className="footer-right">
                            <p>
                                Design & Developed by <strong  className='p_color'>Mehedi Foysal</strong>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;