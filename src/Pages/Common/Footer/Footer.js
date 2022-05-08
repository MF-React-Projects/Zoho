import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();

    return (
        <footer className='footer'>
            <div className="footer-copyright">
                <Container>
                    <Row>
                        <Col md={6} className='mb-2 mb-md-0'>
                            <p>Copyright © {year} All rights reserved.</p>
                        </Col>
                        <Col md={6} className="footer-right">
                            <p>
                                Design & Developed by <strong>Mehedi Foysal</strong>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;