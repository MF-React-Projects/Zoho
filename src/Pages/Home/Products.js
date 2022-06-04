import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import Product from "./Product";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://peaceful-castle-36366.herokuapp.com/homeProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='products'>
            <Container>
                {
                    products.map(product => <Product key={product._id} product={product}/> )
                }
                <div className="text-center">
                    <Link to='/manage-inventories' className='btn-default mt-5'>Manage Inventories</Link>
                </div>
            </Container>
        </div>
    );
};

export default Products;