let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router, gfs) {
    router.route('/files').get(auth.optional, function (req, res) {

        // if (!hasPermission(req.tokenData, "image.get", req, res)) return;

        gfs.files.find().toArray((err, files) => {
            // check if files exist
            if (!files || files.length === 0) {
                return res.status(404).json({ err: 'no files exist' })
            }

            // files exist
            return res.json(files)
        })
    });
}