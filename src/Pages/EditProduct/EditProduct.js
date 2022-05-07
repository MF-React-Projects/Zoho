import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import {useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";

const EditProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const {name, price, image, quantity, supplier, shortDescription, description} = product;
    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues: {
            productName: name,
            productPrice: price,
            productThumb: image,
            productQty: quantity,
            productSupplier: supplier,
            productShortDescription: shortDescription,
            productDescription: description,
            userEmail: user.email,
        }
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/product/${id}`)
            .then(res => {
                setProduct(res.data);
                reset(res.data);
            })
            .catch(err => console.log(err));
    }, [id, reset]);

    const onSubmit = data => {
        const product = {
            name: data.productName,
            price: data.productPrice,
            image: data.productThumb,
            supplier: data.productSupplier,
            quantity: data.productQty,
            shortDescription: data.productShortDescription,
            description: data.productDescription,
            userEmail: data.userEmail,
        }
        if (data.productName && data.productPrice && data.productThumb && data.productSupplier && data.productQty && data.productShortDescription && data.productDescription && data.userEmail) {
            axios.put(`http://localhost:5000/product/edit/${id}`, product)
                .then(res => {
                    toast.success("Product Updated Successfully");
                    navigate("/products");
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='edit-product py-80'>

            <Container>
                <h2 className='text-center mb-5'>Edit Product</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg={4}>
                            <div className='form-group mb-3'>
                                <input className='form-control'
                                       placeholder='Enter product name' {...register("productName", {required: true})} />
                                <small
                                    className='text-danger'>{errors.productName?.type === 'required' && "Product name is required"}</small>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='form-group mb-3'>
                                <input type='number' className='form-control' min='0'
                                       placeholder='Enter product price' {...register("productPrice", {
                                    required: true,
                                    min: 0
                                })} />
                                <small className='text-danger'>
                                    {errors.productPrice?.type === 'required' && "Product price is required"}
                                    {errors.productPrice?.type === 'min' && "Product price must be greater than 0"}
                                </small>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='form-group mb-3'>
                                <input className='form-control'
                                       placeholder='Enter supplier name' {...register("productSupplier", {required: true})} />
                                <small
                                    className='text-danger'>{errors.productSupplier?.type === 'required' && "Supplier name is required"}</small>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <div className='form-group mb-3'>
                                <input className='form-control'
                                       placeholder='Enter product thumbnail url' {...register("productThumb", {required: true})} />
                                <small
                                    className='text-danger'>{errors.productThumb?.type === 'required' && "Product thumbnail url is required"}</small>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='form-group mb-3'>
                                <input type='number' className='form-control' min='0'
                                       placeholder='Enter product quantity' {...register("productQty", {
                                    required: true,
                                    min: 0
                                })} />
                                <small className='text-danger'>
                                    {errors.productQty?.type === 'required' && "Product quantity is required"}
                                    {errors.productQty?.type === 'min' && "Product quantity must be greater than 0"}
                                </small>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='form-group mb-3'>
                                <input type='email' className='form-control'
                                       placeholder='Enter your email' {...register("userEmail", {required: true})}
                                       readOnly/>
                                <small
                                    className='text-danger'>{errors.userEmail?.type === 'required' && "Email is required"}</small>
                            </div>
                        </Col>
                    </Row>

                    <div className='form-group mb-3'>
                        <textarea className='form-control'
                                  placeholder='Enter product short description' {...register("productShortDescription", {required: true})} />
                        <small
                            className='text-danger'>{errors.productShortDescription?.type === 'required' && "Product short description is required"}</small>
                    </div>
                    <div className='form-group mb-3'>
                        <textarea className='form-control'
                                  placeholder='Enter product description' {...register("productDescription", {required: true})} />
                        <small
                            className='text-danger'>{errors.productDescription?.type === 'required' && "Product description is required"}</small>
                    </div>

                    <Button type='submit' className='btn-default btn-secondary' onClick={onSubmit}>Update Product</Button>
                </form>
            </Container>
        </div>
    );
};

export default EditProduct;