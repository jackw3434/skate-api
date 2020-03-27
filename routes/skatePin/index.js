module.exports = function (router) {
    require("./skatePin.delete")(router);
    require("./skatePin.post")(router);
    require("./skatePins.get")(router);
};
