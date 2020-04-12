let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');
var fs = require('fs');
let logo = fs.createReadStream("logo.png")
let {mongoose, connectionString} = require('../../database-connection/mongoose-connection');

let crypto = require('crypto');
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');

let gfs;

let conn = mongoose.createConnection(connectionString, {
    socketTimeoutMS: 30000,
    keepAlive: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

conn.once('open', () => {   
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads') 
    console.log("conn connected")
})

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

const upload = multer({ db:storage });

module.exports = function (router) {
    router.route('/upload', upload.single(logo)).post(function (req, res) {         
 
    
        console.log("reqqqqqqqqqqqqqqqq ",req.file)       
        return res.json({ file: req.file });         
    });
}