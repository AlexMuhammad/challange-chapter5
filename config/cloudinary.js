const cloudinary = require("cloudinary").v2;
require("dotenv").config()

//Get from Cloudinary Dashboard
cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

module.exports = cloudinary;