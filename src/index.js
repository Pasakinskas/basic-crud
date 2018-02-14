const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const quotesController = require('./controllers/quotesController');
const database = require('./database');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '..', 'public')));

app.get('/',(req, res) => {
    req.app.get('db').quotes.find().toArray((err, result) => {
        if (err) {
            console.error(err);
            return;
        };
        res.render('pages/index.ejs', {quotes: result});
    });
});

app.get('/tetris', (req, res) => {
    res.render('pages/tetris.ejs');
});

app.get('/money', (req, res) => {
    res.render('pages/moneyTracker.ejs');
});

app.post('/quotes', quotesController.postQuote);
app.put('/cookQuote', quotesController.replaceQuote);
app.delete('/quotes/:id', quotesController.deleteQuote);

app.set('db', database.quotes);

database.connect((err, db) => {
    if (err) {
        console.error('Failed to initialize database', err);
        return;
    }
    app.set('db', db);
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
});
