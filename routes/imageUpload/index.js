module.exports = function (router, upload, gfs) {
  require("./profilePictureData.get")(router, gfs);
  require("./profilePicture.post")(router, upload);
  require("./profilePicture.delete")(router, gfs);
  require("./image.get")(router, gfs);
  require("./pictureData.getAll")(router, gfs);
};