let express = require('express');
let router = express.Router();
let app = express();
let bodyParser = require('body-parser');
let { serverPort, connectionString, connectToMongoose, mongoose } = require('./database-connection/mongoose-connection');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
let multer = require('multer');
let crypto = require('crypto');
let path = require('path');
let gfs;

connectToMongoose(connectionString);

//CORS middleware
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Headers, Authorization');
    next();
}

router.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ limit:"50mb", extended: true }));
app.use(bodyParser.json({ limit:"50mb", extended: true }));

const storage = new GridFsStorage({
    url: connectionString,
    file: (req, file) => {        
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
})

let upload = multer({ storage });

mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads')
    require('./routes/imageUpload/index')(router, upload, gfs);    
})

require('./routes/skatePin/index')(router);
require('./routes/review/index')(router);
require('./routes/user/index')(router);
require('./routes/identity/index')(router);
require('./routes/me/index')(router);

app.use('/api', router);

router.route('/').get(function (req, res) {
    return res.status(200).send("Hello World, You've hit the Skate API, Heroku says Hi!");
});

app.listen(serverPort);