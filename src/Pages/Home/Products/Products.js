import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import axios from "axios";
import Product from "../Product/Product";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/homeProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='products'>
            <Container>
                {
                    products.map(product => <Product key={product._id} product={product}/> )
                }
            </Container>
        </div>
    );
};

export default Products;