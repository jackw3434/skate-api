let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router, gfs) {
    router.route('/files/:id').delete(auth.optional, function (req, res) {
        // delete image data by id

        // if (!hasPermission(req.tokenData, "image.get", req, res)) return;

        gfs.remove({ _id: req.params.id }, (err, gridStore) => {
            if (err) {
                return res.status(404).json({ err: err })
            }
            return res.status(200).json({ success: "success delete" })
        })
    });
}