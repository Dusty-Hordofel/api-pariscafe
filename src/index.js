const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express(); //to create a server

//middleware
app.use(morgan('dev')); //to Server log
app.use(cors()); //to accept requests from any origin
app.use(express.json()); //to receive json data

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); //to start the server
