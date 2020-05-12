const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

// require the routes
const transactions = require('./routes/transactions');

const app = express();

// to use body parser
app.use(express.json());

if(process.env.NODE_ENV) {
    app.use(morgan('dev'));
}

// user the api route for transactions
app.use('/api/v1/transactions', transactions);

// set path to client build folder if in production
// this handles client paths after api/v1/transactions are handled
if(process.env.NODE_ENV ===  'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));;

