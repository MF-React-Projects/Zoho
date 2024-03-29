import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import Product from "./Product";
import SectionHeader from "../Common/SectionHeader";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://zoho.onrender.com/homeProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='products'>
            <Container>
                <SectionHeader badge={'New Arival'} title={'Our Latest Products'}/>
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