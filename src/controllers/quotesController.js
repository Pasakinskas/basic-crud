const ObjectId = require('mongodb').ObjectId;

const quotesController = {
    postQuote(req, res) {
        req.app.get('db').collection('crud-example').save(req.body,
            (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log('Saved successfuly');
                res.redirect('/');
            }
        );
    },

    replaceQuote(req, res) {
        req.app.get('db').collection('crud-example').findOneAndUpdate({name: 'cook'}, {$set: {
            name: req.body.name,
            quote: req.body.quote
        }}, 
        { sort: {_id: -1}, upsert: false},
            (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                };
                res.send({message: "replaced!"});
            }
        );
    },

    deleteQuote(req, res) {
        req.app.get('db').collection('crud-example').findOneAndDelete({'_id': ObjectId(req.body._id)},
            (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                };
                res.send({message: "Deleted"});
            }
        );
    }
};

module.exports = quotesController;
