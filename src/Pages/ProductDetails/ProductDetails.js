import React, {useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";

const ProductDetails = () => {
    const {id} = useParams();
    const productQtyRef = useRef(0);
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://zoho.onrender.com/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    const {_id, image, name, description, price, quantity, supplier} = product;

    //reduce quantity by 1
    const handleDeliver = () => {
        axios.put(`https://zoho.onrender.com/product/${_id}`,{
            quantity: quantity - 1
        })
            .then(res => {
                //new quantity
                const newQuantity = product.quantity - 1;
                //update product
                setProduct({...product, quantity: newQuantity});

                //send alert
                toast("Product Delivered", {
                    type: toast.TYPE.SUCCESS,
                })
            })
            .catch(err => console.log(err));
    }

    const handleIncreaseQty = (e) => {
        e.preventDefault();
        const newQuantity = productQtyRef.current.value;
        axios.put(`https://zoho.onrender.com/product/${_id}`, {
            quantity: quantity + parseInt(newQuantity),
        })
            .then(res => {
                //update product
                setProduct({...product, quantity: quantity + parseInt(newQuantity)});

                //reset input
                productQtyRef.current.value = '';

                //send alert
                toast("Product Quantity Updated", {
                    type: toast.TYPE.SUCCESS
                });

            })
            .catch(err => console.log(err));
    }

    return (
        <>
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
                                    <li><b>Quantity:</b> {quantity}</li>
                                    <li><b>Supplier:</b> {supplier}</li>
                                </ul>
                                <p>{description}</p>
                                <div className="d-flex align-items-center mt-4">
                                    <Button className='btn-default btn-secondary btnSm me-3' onClick={handleDeliver}>Delivered</Button>
                                    <Link to='/manage-inventories' className='btn-default btnSm'>Manage Inventories</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={'restock-item'}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6}>
                            <div className="restock-item-title">
                                <h2 className='text-center mb-4'>Restock Item</h2>
                            </div>
                            <Form onSubmit={handleIncreaseQty}>
                                <Form.Group className="mb-3" controlId="formQunatity">
                                    <Form.Label>Increase Quantity</Form.Label>
                                    <Form.Control ref={productQtyRef} min='0' type="number" placeholder="Enter product quantity" />
                                </Form.Group>
                                <Button className='btn-default btnSm' type="submit">Update</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ProductDetails;