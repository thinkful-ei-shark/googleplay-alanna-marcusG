const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const playstore = require('./playstore-data');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.get('/apps', (req, res) => {
    const {search = '', sort} = req.query;
    if(sort){
        if(!['rating', 'app'].includes(sort)){
            return res
                .status(400)
                .send('Sort must be a rating or app');
        }
    }

    let results = playstore
        .filter(app => {
            return (
                app
                .genre
                .toLowerCase()
                .includes(search.toLowerCase())
            );
        })
    
    if(sort){
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1: a[sort] < b[sort] ? -1 : 0;
        });
    }
    res
        .json(results);

});

app.listen(8000, () => {
    console.log('Server started at PORT 8000');
});