const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const playstore = require('./playstore-data');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.get('/apps', (req, res) => {
    res
        .json(playstore);

});

app.listen(8000, () => {
    console.log('Server started at PORT 8000');
});