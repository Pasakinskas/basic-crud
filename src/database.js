const mongoClient = require('mongodb').MongoClient;
const mongoLink = 'mongodb://Droztukas1:mmm03240742@ds123371.mlab.com:23371/crud-tutorial';

const databaseControl = {
    connectToDatabase(callback) {
        mongoClient.connect(mongoLink, (err, connection) => {
            if (err) {
                console.error(err);
                return;
            }
            callback(err, connection.db('crud-tutorial'));
        });
    }
};

module.exports = databaseControl;
