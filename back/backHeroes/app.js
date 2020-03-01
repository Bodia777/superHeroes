const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const heroesRouter = require('./routes/heroesRouter');
const morgan = require('morgan');
const bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost:27017/heroes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
let app = express();
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(heroesRouter);
// app.use(employeesRouter);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status=404;
    error.message = 'wrong href';
    next(error);
});

app.use((error, req, res, next) => {
 res.status(error.status || 500);
 res.json({
     error: {message: error.message}
    })
});

app.listen(3000, () => {
    console.log('listening3000...')
});
