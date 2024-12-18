const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const MenuIteam = require('./modules/MenuIteam');
const passport = require('./auth');
const Person = require('./modules/person');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


// here middleware function 
const logRequest = (req, res, next )=>{
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next() // Move on the next phase     
}

// app.use(logRequest);

app.get('/', function (req,res){
    res.send('Welcome to my hotel.. Her e users !')

})


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})


// Import the router files
const personroutes = require('./routes/personroutes');
const menuroutes = require('./routes/menuroutes');

app.use('/person', localAuthMiddleware , personroutes)
app.use('/menu' , menuroutes) // here not working  localAuthMiddleware  *************  solve krna hai 

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
