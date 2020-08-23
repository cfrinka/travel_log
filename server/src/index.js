const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect('mongodb+srv://carlosadmin:litalova1@test-cluster.9zvhq.mongodb.net/travel-log?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const middlewares = require('./middlewares');
const logs = require('./api/logs')

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json())

app.get('/', (req,rest) => {
    rest.json({
        message: "hello world",
    });
});

app.use('/api/logs', logs)

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);



const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log('Listening at http://localhost:1337');
});