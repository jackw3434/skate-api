let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router, upload) {
    router.route('/upload').post(auth.optional, upload.single("file"), function (req, res) {
     
        // if (!hasPermission(req.tokenData, "image.upload", req, res)) return;

        if(res.statusCode == 200){
            return res.json({ file: req.file });
        } else {
            return res.json({ file: "failed" });
        }     
    });
}