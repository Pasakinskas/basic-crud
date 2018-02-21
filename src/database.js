const mongoClient = require('mongodb').MongoClient;
const mongoLink = 'mongodb://Droztukas1:mmm03240742@ds123371.mlab.com:23371/crud-tutorial';

function connect(callback) {
    mongoClient.connect(mongoLink, (err, connection) => {
        if (err) {
            callback(err);
            return;
        }
        const db = connection.db('crud-tutorial');
        callback(null, {
            quotes: db.collection('crud-example'),
            moneyTracker: db.collection('financial-tracker'),
        });
    });
}

module.exports = {
    connect,
};
