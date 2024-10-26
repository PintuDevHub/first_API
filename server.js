const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const MenuIteam = require('./modules/MenuIteam');
const Person = require('../nodes/modules/person');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;



app.get('/', function (req,res){
    res.send('Welcome to my hotel.. Her e users !')

})


// Import the router files
const personroutes = require('./routes/personroutes');
const menuroutes = require('./routes/menuroutes');

app.use('/person', personroutes)
app.use('/menu', menuroutes)

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
     
})




// app.get('/menuview', function (req,res){
//     res.send('Welcome to my hotel menu .. Her e users !')

// })


// app.get('/', function (req,res){
//     res.send('Welcome to my hotel.. How can i help you !')

// })







// server.js

// const express = require('express');
// const app = express();
// const connectDB = require('./db'); // Import the connectDB function from db.js


// const PORT = process.env.PORT || 3000;

// // Connect to MongoDB
// connectDB();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Sample route
// app.get('/', (req, res) => {
//     res.send('Hello, MongoDB with Express!');
// });

// app.get('/users', (req, res) => {
//     res.send('Hello, MongoDB with Express with users!');
// });



// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });
