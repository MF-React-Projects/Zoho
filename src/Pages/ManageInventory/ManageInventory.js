import React from 'react';
import {Table} from "react-bootstrap";

const ManageInventory = () => {
    return (
        <div className='manage-inventories'>
            <h2 className='text-center mb-5'>Manage Inventories</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Supplier</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Product 1</td>
                    <td>$1.00</td>
                    <td>Supplier 1</td>
                    <td>10</td>
                    <td>
                        <button className='btn btn-sm btn-primary'>Edit</button>
                        <button className='btn btn-sm btn-danger'>Delete</button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ManageInventory;