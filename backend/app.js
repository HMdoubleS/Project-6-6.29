const express = require('express'); // imports framework
const mongoose = require('mongoose'); 
const path = require('path');
const dotenv = require('dotenv');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

dotenv.config();
const app = express();

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cem88.mongodb.net/test?retryWrites=true&w=majority`
// connecting MongoDB Atlas
mongoose.connect(connectionString)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');    
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

app.use(express.json());

// setting headers 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;