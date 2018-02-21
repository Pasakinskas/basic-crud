const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const ws = require('ws');

const quotesController = require('./controllers/quotesController');
const moneyController = require('./controllers/moneyController');
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

app.post('/money', moneyController.postExpense);

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

const wss = new ws.Server({ port: 3001 });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', connection => {
    connection.on('message', messageContent => {
        wss.broadcast(messageContent);
    });
    connection.on('error', err => console.error(err));
});

wss.on('error', err => {
    console.error(err);
});