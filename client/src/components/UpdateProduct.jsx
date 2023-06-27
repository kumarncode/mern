import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
const UpdateProducts = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    let url = `http://localhost:5000/api/products/${params.id}`;
    console.log(url);
    useEffect(() => {
        // Fetch the product data and populate the form
        axios.get(`http://localhost:5000/api/products/${params.id}`)
            .then((response) => {
                const { name, price } = response.data;
                setName(name);
                setPrice(price);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [params.id]);

    const handleSubmitForm = (event) => {
        event.preventDefault();

        // Update the product
        axios.put(`http://localhost:5000/api/products/${params.id}`, { name, price })
            .then((response) => {
                console.log('Product updated:', response.data);
                // Handle success or redirect
                window.alert("Product updated Successfully");
            })
            .catch((error) => {
                console.error('Error updating product:', error);
                // Handle error
            });
    };

    return (
        <>
            <div className='container my-5'>
                <div className='row'>
                    <div className='offset-md-3 col-md-6'>
                        <form className="bg-light p-5" onSubmit={handleSubmitForm}>
                            <h1>Update Product</h1>
                            <div className="mb-3 mt-3">
                                <label htmlFor="mname">Mobile Name:</label>
                                <input type="text" id="mname" placeholder="Enter Mobile Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="mprice">Mobile Price:</label>
                                <input type="text" id="mprice" placeholder="Enter Mobile Price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-primary">Update Product</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default UpdateProducts;