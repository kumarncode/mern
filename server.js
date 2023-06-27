const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const jwtKey = "e-comm";
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecomm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a schema and model for User
  const User = mongoose.model('User', {
    username: String,
    password: String,
  });
// Register route

// Create a schema and model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema, 'products');

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Middleware

// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    jwt.sign({ newUser }, jwtKey, { expiresIn: "2h"}, (err, token)=>{
      if(err){
      res.status({result: "something went wrong"});
      }
      res.status(200).json({user:newUser, auth: token,message: 'User registered successfully' });
    });
    // res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate a JWT token
    jwt.sign({ userId: user._id }, jwtKey, { expiresIn: "2h"}, (err, token)=>{
      if(err){
      res.status({result: "something went wrong"});
      }
      res.status(200).json({user, auth: token, message: 'User login successfully' });
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to login' });
  }
});
// Read all products
app.get('/api/products', (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error('Error getting products:', error);
      res.status(500).json({ error: 'Error getting products' });
    });
});
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((error) => {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Error fetching product' });
    });
});
app.post('/api/products', (req, res) => {
  const product = new Product(req.body);
  product.save()
    .then(() => {
      res.status(201).json({ message: 'Product created successfully' });
    })
    .catch((error) => {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Error creating product' });
    });
});

app.put('/api/products/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: 'Product updated successfully' });
    })
    .catch((error) => {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Error updating product' });
    });
});

app.delete('/api/products/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: 'Product deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Error deleting product' });
    });
});


// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
