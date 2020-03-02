let mongoose = require('mongoose');
let serverPort = process.env.PORT || 8000;
const connectionString = "mongodb+srv://skateAdmin:skate4life@skatecluster-jmgnl.mongodb.net/test?retryWrites=true&w=majority";

module.exports = {
    connectToMongoose: function (connectionString) {
        const option = {
            socketTimeoutMS: 30000,
            keepAlive: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connect(connectionString, option, (err) => {
            if (err) {
                console.log(err);
                console.log('Retrying Database Connection');
                this.connectToMongoose();
            }
            console.log("Database Connected", connectionString);
        });
    }, mongoose, connectionString, serverPort
}