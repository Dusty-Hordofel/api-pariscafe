const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); //to create a server

//middleware
app.use(morgan('dev')); //to Server log
app.use(cors()); //to accept requests from any origin
app.use(express.json()); //to receive json data

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await mongoose.connect(DATABASE);
    console.log('Connected to Mongo...');
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 26 ~ app.listen ~ error', error);
  }
}); //to start the server
