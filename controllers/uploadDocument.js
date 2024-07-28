const cloudinary = require('cloudinary').v2;

exports.uploadPdfToCloudinary = async (file, folder) => {
  const options = {
    folder,
    resource_type: "auto"
  };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
