const mongoose = require('mongoose');   // here Access monogoose 
require('dotenv').config();

// Define the MongoDB connection URL
 const mongoURL =   process.env.LOCALDB_URL // here loacal dabase url  
// const mongoURL =  process.env.MONGODB_URL // here cloud atls url

// set up the mongo connection
mongoose.connect(mongoURL)

// Get the default connection
// Mongoose maintains a default connection object representiong the Mongoose

const db = mongoose.connection;

// Define event listeners for databse connection 
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
});

db.on('error',(err)=>{
    console.log('MongoDB connection errror', err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');

});

// Export the dtabase connection
module.exports = db;


// db.js
// const mongoose = require('mongoose');

// // Replace with your actual MongoDB connection string
// const uri = 'mongodb://127.0.0.1:27017/hotels';

// const connectDB = async () => {
//     try {
//         await mongoose.connect(uri)
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('MongoDB connection error:', err);
//         process.exit(1); // Exit the process with failure
//     }
// };

// module.exports = connectDB;
