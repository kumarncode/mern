import React from 'react';
import Products from './components/Products';
import AddProducts from './components/AddProduct';
import UpdateProducts from './components/UpdateProduct';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
const App = () => {
 
  return (
    <>    
     <Header />
<Routes>
  
<Route exact path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/updateproducts/:id" element={<UpdateProducts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<NotFound />} />
</Routes>
    
    </>
  );
};

export default App;
