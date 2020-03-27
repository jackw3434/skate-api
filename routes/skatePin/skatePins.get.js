let SkatePins = require('../../models/skatePin');
let auth = require('../../utils/auth');
let hasPermission = require('../../utils/hasPermission');

module.exports = function (router) {
    router.route('/skatePins').get(auth.required, function (req, res) {

        if (!hasPermission(req.tokenData, "skatePins.get", req, res)) return;
  
        SkatePins.find({}, function (err, skatePins) {

            if (err) {
                return res.status(400).send('Generic_Error, getSkatePins_failed, Unable togGet Skate Pins');
            }

            return res.status(200).json({ skatePins: skatePins });
        })
    });
}

