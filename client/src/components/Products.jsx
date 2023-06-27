import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap';
const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
        //handleSubmit();
    }, []);
    const auth = localStorage.getItem('user');
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/api/products', {
            headers: {
                authorization: JSON.stringify(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
        // axios.get('http://localhost:5000/api/products')
        //     .then((response) => {
        //         setProducts(response.data);
        //     })
        //     .catch((error) => {
        //         console.error('Error getting products:', error);
        //     });
    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/products/${id}`)
            .then(() => {
                window.alert('Product deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
            });
    };

    return (
        <>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-md-8'>
                    <h2 className='my-3'>Products List</h2>
                    </div>
                    <div className='col-md-4'>
                    {auth?<LinkContainer to="/addproducts">
                           <button className='btn btn-primary'>Add Products</button>
                        </LinkContainer>:null}                        
                    </div>
                    <div className='col-md-12'>
                        
                        <Table striped bordered hover responsive>
                            <thead className='bg-primary'>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Mobile Name</th>
                                    <th>Mobile Price</th>
                                    {auth?<th>Action</th>:null}
                                    
                                </tr>
                            </thead>
                            <tbody>

                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        {auth?<td>
                                            <button className='btn btn-danger' onClick={() => handleDelete(product._id)}>Delete</button>
                                            <LinkContainer to={`/updateproducts/${product._id}`}>
                                                <button className='btn btn-success mx-2'>Update</button>
                                            </LinkContainer>
                                        </td>:null}
                                        
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Products;