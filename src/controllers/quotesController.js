const ObjectId = require('mongodb').ObjectId;

const quotesController = {
    postQuote(req, res) {
        req.app.get('db').quotes.save(req.body, (err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            };
            res.json({
                message: 'Saved!',
                data: req.body,
            });
        });
    },

    replaceQuote(req, res) {
        req.app.get('db').quotes.findOneAndUpdate({name: 'cook'}, {$set: {
            name: req.body.name,
            quote: req.body.quote
        }}, 
        { sort: {_id: -1}, upsert: false},
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                    return;
                };
                res.json({
                    message: "replaced!",
                    data: req.body,
                });
            }
        );
    },

    deleteQuote(req, res) {
        req.app.get('db').quotes.findOneAndDelete({_id: ObjectId(req.params.id)},
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                    return;
                };
                res.json({
                    message: "Deleted!",
                    data: req.body,
                });
            }
        );
    }
};

module.exports = quotesController;
