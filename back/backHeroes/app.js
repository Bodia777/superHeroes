const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const heroesRouter = require('./routes/heroesRouter');


mongoose.connect('mongodb://localhost:27017/heroes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
let app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
console.log('uraback2');

app.use(heroesRouter);
// app.use(employeesRouter);

app.use((err, req, res, next) => {
    try {

    } catch (e) {
console.log(e);

    }
});

app.listen(3000, () => {
    console.log('listening3000...')
});