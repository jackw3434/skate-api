let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

// get image data by filename
module.exports = function (router, gfs) {
    router.route('/image/:filename').get(auth.optional, function (req, res) {

        // if (!hasPermission(req.tokenData, "image.get", req, res)) return;

        // get image/:filename
        // display single file

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
                return res.status(404).json({ err: 'Not an image' })
            }
        })
    });
}