const cloudinary = require("cloudinary").v2;

//Get from Cloudinary Dashboard
cloudinary.config({
    cloud_name: "dlgyb9w63",
    api_key: "869172927415759",
    api_secret: "o9G8EWAwyGgFunpCxUzspVMY4KI",
    secure: true,
});

module.exports = cloudinary;