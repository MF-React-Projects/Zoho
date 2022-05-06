import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    const {_id, image, name, description, price, quantity, supplier} = product;

    const handleDeliver = (id) => {

    }


    return (
        <div className='product-details'>
            <Container>
                <Row>
                    <Col lg={3}>
                        <div className="product-single-thumb">
                            <img src={image} alt="product-thumb" className='img-fluid'/>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className="product-single-content">
                            <h2>{name}</h2>
                            <ul className='product-infos list-unstyled ps-0 ms-0 mb-3 d-flex align-items-center justify-content-between'>
                                <li><b>Price:</b> ${price}</li>
                                <li><b>Supplier:</b> {supplier}</li>
                                <li><b>Quantity:</b> {quantity}</li>
                            </ul>
                            <p>{description}</p>
                            <Button className='btn-default btn-secondary btnSm' onClick={()=> handleDeliver(_id)}>Delivered</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetails;