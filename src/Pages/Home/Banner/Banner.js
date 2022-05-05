import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Banner = () => {

    return (
        <>
            <div id="home" className="z-banner" style={{backgroundImage: 'url("https://clanvent.laratheme.com/wp-content/themes/hello-elementor-child/clanvent-assets/images/banner.png")'}}>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="banner-content">
                                <h1 className="">Best Inventory<br/> For Your Business<br/> To Grow</h1>
                                <p className=""><b>ZOHO</b> is an Inventory Management System that
                                    allows you to manage your inventory in a more efficient way and maximize on the
                                    business potentials</p>
                                <a href="" className="btn-default">View Demo</a>
                            </div>
                        </Col>
                        <Col lg='6'>
                            <div className="ic-banner-image">
                                <img className='img-fluid'
                                     src="https://clanvent.laratheme.com/wp-content/themes/hello-elementor-child/clanvent-assets/images/banner-image.png"
                                     alt="banner"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Banner;