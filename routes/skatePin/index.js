module.exports = function (router, upload) {
    require("./skatePin.delete")(router);
    require("./skatePin.post")(router, upload);
    require("./skatePins.get")(router);
};