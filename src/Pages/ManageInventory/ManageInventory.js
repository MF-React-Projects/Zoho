import React, {useEffect, useState} from 'react';
import {Container, Table, Pagination} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const ManageInventory = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://zoho.onrender.com/products?page=${page}&limit=${limit}`)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, [page, limit]);

    useEffect(() => {
        fetch('https://zoho.onrender.com/productCount') //fetching the number of products
            .then(res => res.json())
            .then(data => {
                setPageCount(Math.ceil(data.count / limit));
            });
    }, [limit]);

    const deleteProduct = (id) => {
        //confirm before delete
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            axios.delete(`https://zoho.onrender.com/products/${id}`)
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
    console.log(pageCount)
    let items = [];
    for (let number = 1; number <= pageCount; number++) {

        items.push(
            <Pagination.Item key={number} active={number === page + 1} onClick={() => setPage(number - 1)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className='manage-inventories'>
            <Container>
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <h2 className='text-center mb-0'>Manage Inventories</h2>
                    <button className='btn-default btn-secondary btnSm' onClick={() => navigate('/product/add')}>Add
                        Product
                    </button>
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
                <div className="d-flex align-items-center justify-content-center mt-4">
                    {pageCount > 1 && <Pagination className={'justify-content-center ms-0 me-3'}>{items}</Pagination>}
                    <div className="d-flex align-items-center">
                        <span>Per Page:</span>
                        <select onClick={event => setLimit(event.target.value)} className={'form-control mb-0 ms-2'}
                                style={{width: '100px'}}>
                            <option value='5' selected>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                        </select>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ManageInventory;