const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./database');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '..', 'public')));

const quotesController = require('./controllers/quotesController');

app.get('/',(req, res) => {
    req.app.get('db').collection('crud-example').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('pages/index.ejs', {quotes: result});
    });
});

app.get('/tetris', (req, res) => {
    res.render('pages/tetris.ejs');
});

app.post('/quotes', quotesController.postQuote);
app.put('/quotes', quotesController.replaceQuote);
app.delete('/quotes', quotesController.deleteQuote);

database.connectToDatabase((err, dbConnection) => {
    if (err) {
        console.error(err);
        return;
    }
    app.set('db', dbConnection);
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
});
