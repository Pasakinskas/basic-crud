const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoLink = 'mongodb://Droztukas1:mmm03240742@ds123371.mlab.com:23371/crud-tutorial';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

let db;

MongoClient.connect(mongoLink, (error, database) => {
    if (error) {
        return console.log(error);
    }
    db = database.db('crud-tutorial');
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
});

app.get('/',(req, res) => {
        db.collection('crud-example').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('pages/index.ejs', {quotes: result})
    });
});

app.post('/quotes', (req, res) => {
    db.collection('crud-example').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Saved successfuly');
        res.redirect('/');
    });
  });

  app.put('/quotes', (req, res) => {
    db.collection('crud-example').findOneAndUpdate(
        {name: 'covfefe'}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
        }, {
        sort: {_id: -1},
        upsert: true       
        },
        (err, result) => {
            if (err) res.send(err);
            res.send(result);
        });
  });
