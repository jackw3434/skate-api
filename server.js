let express = require('express');
let router = express.Router();
let app = express();
var http = require('http').Server(app);
let bodyParser = require('body-parser');
let { serverPort, connectionString, connectToMongoose, mongoose } = require('./database-connection/mongoose-connection');

connectToMongoose(connectionString);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS middleware
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Headers, Authorization');
    next();
}

router.use(allowCrossDomain);

require('./routes/skatePin/index')(router);
require('./routes/user/index')(router);
require('./routes/identity/index')(router);
require('./routes/me/index')(router);

app.use('/api', router);

router.route('/').get(function (req, res) {
    return res.status(200).send("Hello World, You've hit the Skate API, Heroku says Hi!");
});

app.listen(serverPort);
