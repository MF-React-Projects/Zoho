import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import axios from "axios";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const MyProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getProduct = async () => {
            await axios.get('http://localhost:5000/myProducts?email=' + user.email, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            })
                .then(res => setProducts(res.data))
                .catch(err => console.log(err));
        }
        getProduct();
    }, [user]);

    const deleteProduct = (id) => {
        //confirm before delete
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if(confirm){
            axios.delete(`http://localhost:5000/products/${id}`)
                .then(res => {
                    setProducts(products.filter(product => product._id !== id));
                    toast.success("Product Deleted Successfully");
                })
                .catch(err => console.log(err));
        }
    }

    const editProduct = (id) => {
        navigate(`/product/edit/${id}`);
    }

    return (
        <div className='my-products py-80'>
            <Container>
                <h2 className='text-center mb-5'>My Products</h2>
                {
                    products.length > 0 ?
                        <Table striped bordered hover>
                            <thead align={'center'} valign={'center'}>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Supplier</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody align={'center'} valign={'middle'}>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img onClick={() => navigate('/product/'+product._id)} src={product.image} alt="product" className="img-fluid" width="40" height="40"/>
                                            <h6 onClick={() => navigate('/product/'+product._id)} className="mb-0 ms-3">{product.name}</h6>
                                        </div>
                                    </td>
                                    <td>${product.price}</td>
                                    <td>{product.supplier}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button onClick={() => editProduct(product._id)} className='btn-default btn-secondary btnSm me-3'>Edit</button>
                                        <button onClick={() => deleteProduct(product._id)} className='btn-default btnSm'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        :
                        <div className='alert alert-info text-center'>
                            <h5>No Products Found</h5>
                            <button className='btn-default btn-secondary btnSm' onClick={()=> navigate('/product/add')}>Add Product</button>
                        </div>
                }

            </Container>
        </div>
    );
};

export default MyProducts;