import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const BusinessSummary = () => {
    return (
        <section className="business-summary py-80">
            <Container>
                <Row>
                    <Col lg={3} md={6}>
                        <div className="cms-counter layout1 style2 mb-4 mb-lg-0">
                            <div className="cms-counter-inner">
                                <div className="top-counter">
                                    <h3 className="cms-counter-number-wrapper">
                                        <CountUp start={0} end={50} duration={2}>
                                            {({countUpRef, start}) => (
                                                <VisibilitySensor onChange={start}>
                                                    <span ref={countUpRef}/>
                                                </VisibilitySensor>
                                            )}
                                        </CountUp>
                                    </h3>
                                </div>
                                <h4 className="cms-counter-title">Years Experience</h4></div>
                        </div>
                    </Col>
                    <Col lg={3} md={6}>
                        <div className="cms-counter layout1 style2 mb-4 mb-lg-0">
                            <div className="cms-counter-inner">
                                <div className="top-counter">
                                    <h3 className="cms-counter-number-wrapper">
                                        <CountUp start={0} end={1580} duration={2}>
                                            {({countUpRef, start}) => (
                                                <VisibilitySensor onChange={start}>
                                                    <span ref={countUpRef}/>
                                                </VisibilitySensor>
                                            )}
                                        </CountUp>
                                        <span className="cms-counter-number-suffix">+</span>
                                    </h3>
                                </div>
                                <h4 className="cms-counter-title">happy customer</h4></div>
                        </div>
                    </Col>
                    <Col lg={3} md={6}>
                        <div className="cms-counter layout1 style2 mb-4 mb-lg-0">
                            <div className="cms-counter-inner">
                                <div className="top-counter">
                                    <h3 className="cms-counter-number-wrapper">
                                        <CountUp start={0} end={254} duration={2}>
                                            {({countUpRef, start}) => (
                                                <VisibilitySensor onChange={start}>
                                                    <span ref={countUpRef}/>
                                                </VisibilitySensor>
                                            )}
                                        </CountUp>
                                    </h3>
                                </div>
                                <h4 className="cms-counter-title">distributor</h4></div>
                        </div>
                    </Col>
                    <Col lg={3} md={6}>
                        <div className="cms-counter layout1 style2 mb-4 mb-lg-0">
                            <div className="cms-counter-inner">
                                <div className="top-counter">
                                    <h3 className="cms-counter-number-wrapper">
                                        <CountUp start={0} end={46} duration={2}>
                                            {({countUpRef, start}) => (
                                                <VisibilitySensor onChange={start}>
                                                    <span ref={countUpRef}/>
                                                </VisibilitySensor>
                                            )}
                                        </CountUp>
                                    </h3>
                                </div>
                                <h4 className="cms-counter-title">factory industrial</h4></div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </section>
    );
};

export default BusinessSummary;