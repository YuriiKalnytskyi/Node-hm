const {
  fileEnum: {
    DOCS_MIMETYPES, FILE_MAX_SIZE, VIDEO_MAX_SIZE, VIDEOS_MIMETYPES, PHOTO_MAX_SIZE, PHOTOS_MIMETYPES
  }, code
} = require('../constants');
const { ErrorHandler } = require('../errors');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      if (req.files) {
        const files = Object.values(req.files);

        const documents = [];
        const videos = [];
        const photos = [];
        for (let i = 0; i < files.length; i++) {
          const { name, size, mimetype } = files[i];

          if (PHOTOS_MIMETYPES.includes(mimetype)) {
            if (size > PHOTO_MAX_SIZE) {
              throw new ErrorHandler(code.DAD_REQUEST, `File ${name} is too big`, 4006);
            }
            photos.push(files[i]);
          } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
            if (size > VIDEO_MAX_SIZE) {
              throw new ErrorHandler(code.DAD_REQUEST, `File ${name} is too big`, 4006);
            }

            videos.push(files[i]);
          } else if (DOCS_MIMETYPES.includes(mimetype)) {
            if (size > FILE_MAX_SIZE) {
              throw new ErrorHandler(code.DAD_REQUEST, `File ${name} is too big`, 4006);
            }

            documents.push(files[i]);
          } else {
            throw new ErrorHandler(code.DAD_REQUEST, 'Wrong file format', 4007);
          }
        }

        req.documents = documents;
        req.videos = videos;
        req.photos = photos;

        [req.avatar] = req.photos;
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkAvatar: (req, res, next) => {
    try {
      if (req.photos.length > 1) {
        throw new ErrorHandler(code.DAD_REQUEST, 'Body not valid!', 4008);
      }

      [req.avatar] = req.photos;
      next();
    } catch (e) {
      next(e);
    }
  }

};
