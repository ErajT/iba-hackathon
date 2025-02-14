const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { checkToken } = require("./auth/token_validation")

const userRouter = require('./api/users/user.router');
const ScheduleRouter = require('./Routes/ScheduledRoutes');
const UsersRouter = require('./Routes/UsersRouter');

let app = express();
app.options('*', cors()); // Allow preflight requests

// Middleware to enable CORS
app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'https://iba-hackathon.vercel.app'); // Adjust the origin as needed
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); 
  next();
});


app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));




//middleware for request body
app.use(express.json());
app.use('/users', userRouter);
app.use('/schedule', ScheduleRouter);
app.use('/usersCrud', UsersRouter);




app.listen(2000,()=>{
  console.log("Server has started");
})


module.exports = app;