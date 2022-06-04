import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const ManageInventory = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://peaceful-castle-36366.herokuapp.com/products")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const deleteProduct = (id) => {
        //confirm before delete
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            axios.delete(`https://peaceful-castle-36366.herokuapp.com/products/${id}`)
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
        <div className='manage-inventories'>
            <Container>
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <h2 className='text-center mb-0'>Manage Inventories</h2>
                    <button className='btn-default btn-secondary btnSm' onClick={() => navigate('/product/add')}>Add Product</button>
                </div>
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
                                    <img onClick={() => navigate('/product/' + product._id)} src={product.image}
                                         alt="product" className="img-fluid" width="40" height="40"/>
                                    <h6 onClick={() => navigate('/product/' + product._id)}
                                        className="mb-0 ms-3">{product.name}</h6>
                                </div>
                            </td>
                            <td>${product.price}</td>
                            <td>{product.supplier}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => editProduct(product._id)}
                                        className='btn-default btn-secondary btnSm me-3'>Edit
                                </button>
                                <button onClick={() => deleteProduct(product._id)}
                                        className='btn-default btnSm'>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ManageInventory;