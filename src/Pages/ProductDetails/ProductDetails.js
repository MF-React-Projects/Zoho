import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    const {image, name, description, price, quantity, supplier} = product;
    return (
        <div className='product-details'>
            <Container>
                <Row>
                    <Col lg={5}>
                        <div className="product-single-thumb">
                            <img src={image} alt="product-thumb"/>
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className="product-single-content">
                            <h2>{name}</h2>
                            <p className="price">{price}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetails;