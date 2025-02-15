const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { checkToken } = require("./auth/token_validation")

const userRouter = require('./api/users/user.router');
const UsersRouter = require('./Routes/UsersRouter');
const materialRouter = require('./Routes/MaterialRouter');
const collectionRouter = require('./Routes/CollectionRouter');
const FlashCardRouter = require('./Routes/FlashCardRouter');

let app = express();
app.options('*', cors()); // Allow preflight requests


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend application
  credentials: true // Allow credentials (cookies) to be included with requests
}));


// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); 
  next();
});


app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));




//middleware for request body
app.use(express.json());
app.use('/collection', collectionRouter);
app.use('/material', materialRouter);
app.use('/users', userRouter);
app.use('/usersCrud', UsersRouter);
app.use('/flashcard', FlashCardRouter);




app.listen(2000,()=>{
  console.log("Server has started");
})


module.exports = app;