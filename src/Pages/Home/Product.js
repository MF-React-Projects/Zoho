import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Product = ({product}) => {
    const {_id, name, price, image, quantity, supplier, shortDescription} = product;
    const navigate = useNavigate();

    return (
        <div className='product-item d-flex justify-content-between align-items-center shadow-sm p-3 mb-3'>
            <div className="img-box">
                <img src={image} alt="" className='img-fluid'/>
            </div>
            <div className="product-content px-4">
                <ul className='product-infos list-unstyled ps-0 ms-0 mb-3 row-cols-2'>
                    <li>Name: {name}</li>
                    <li>Price: ${price}</li>
                    <li>Supplier: {supplier}</li>
                    <li>Quantity: {quantity}</li>
                </ul>
                <p>{shortDescription}</p>
            </div>
            <div className='product-right'>
                <Button onClick={() => navigate('/product/'+_id)} className='btn-default'>Update</Button>
            </div>
        </div>
    );
};

export default Product;