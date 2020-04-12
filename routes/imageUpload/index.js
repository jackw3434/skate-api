module.exports = function (router) {
  require("./imageUpload.get")(router);
  require("./imageUpload.post")(router);
  require("./imageUpload.delete")(router);
};
