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
require('./routes/review/index')(router);
require('./routes/user/index')(router);
require('./routes/identity/index')(router);
//require('./routes/imageUpload/index')(router);
require('./routes/me/index')(router);

let crypto = require('crypto');
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
let path = require('path');

let conn = mongoose.createConnection(connectionString, {
    socketTimeoutMS: 30000,
    keepAlive: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
})

// Create Storage Engine
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
});

const upload = multer({ storage });

var fs = require('fs');
let logo = fs.createReadStream("logo.png")


//upload.single("file")    "file" is the name on the input object from the tutorial <input name="file"/>

app.post('/upload', upload.single("file"), (req, res) => {

    console.log("here");
    return res.json({ file: req.file });
    /*....*/
})

// get all images data
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // check if files exist
        if (!files || files.length === 0) {
            return res.status(404).json({ err: 'no files exist' })
        }

        // files exist
        return res.json(files)
    })
})

// get image data by filename
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // check if file exist
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'no file exist' })
        }

        // file exist
        return res.json(file)
    })
})

// get image/:filename
// display single file
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // check if file exist
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'no file exist' })
        }

        // check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // read the output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: 'Not an image' })
        }
    })
})

app.use('/api', router);

router.route('/').get(function (req, res) {
    return res.status(200).send("Hello World, You've hit the Skate API, Heroku says Hi!");
});

app.listen(serverPort);
