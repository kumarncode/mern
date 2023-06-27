import React, { useState } from 'react';
import axios from 'axios';
const AddProducts = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // getProducts();
        const newProduct = { name, price };
        axios.post('http://localhost:5000/api/products', newProduct)
            .then(() => {
                setName('');
                setPrice('');
                window.alert('Product created successfully');
            })
            .catch((error) => {
                console.error('Error creating product:', error);
            });
    };

    return (
        <>
            <div className='container my-5'>
                <div className='row'>
                    <div className='offset-md-3 col-md-6'>
                        <form className="bg-light p-5" onSubmit={handleSubmit}>
                            <h1>Add Product</h1>
                            <div className="mb-3 mt-3">
                                <label htmlFor="mname">Mobile Name:</label>
                                <input type="text" id="mname" placeholder="Enter Mobile Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="mprice">Mobile Price:</label>
                                <input type="text" id="mprice" placeholder="Enter Mobile Price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-primary">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AddProducts;