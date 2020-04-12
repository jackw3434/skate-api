let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

// get image data by filename
module.exports = function (router, gfs) {
    router.route('/files/:filename').get(auth.optional, function (req, res) {

        // if (!hasPermission(req.tokenData, "image.get", req, res)) return;

        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            // check if file exist
            if (!file || file.length === 0) {
                return res.status(404).json({ err: 'no file exist' })
            }

            // file exist
            return res.json(file)
        })       
    });
}