const path = require('path');
const fs = require('fs');
const uuid = require('uuid').v1;
const { promisify } = require('util');

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
  fileDownload: async (fileName, id, itemType, fileType) => {
    const pathWithoutStatic = path.join(itemType, id.toString(), fileType);
    const uploadFile = path.join(process.cwd(), 'static', pathWithoutStatic);

    const fileExtension = fileName.split('.').pop();
    const photoName = `${uuid()}.${fileExtension}`;
    const finalPath = path.join(uploadFile, photoName);

    await mkdirPromise(uploadFile, { recursive: true });

    return {
      finalPath,
      photoPath: path.join(pathWithoutStatic, photoName)
    };
  }

};
