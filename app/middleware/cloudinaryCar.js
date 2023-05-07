const { Car } = require("../models");
const cloudinary = require("../../config/cloudinary");

const getPublicId = (imageURL) => {
    if (!imageURL) return "";

    const CLOUDINARY_REGEX =
        /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video|raw)\/)?(?:(upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

    const parts = CLOUDINARY_REGEX.exec(imageURL);

    return parts && parts.length > 2 ? parts[parts.length - 2] : imageURL;
};

module.exports = {
    async checkCar(req, res, next) {
        try {
            const id = req.params.id;
            const resData = await Car.findOne({
                where: { id },
            });

            if (!resData) {
                res.status(404).json({
                    error: "Car not found!",
                });

                return;
            }

            req.car = resData;

            next();
        } catch (error) {
            res.status(500).json({
                message: "Error!",
                err_msg: error.message,
            });
        }
    },
    async cloudinaryUpload(req, res, next) {
        try {
            if (req.car?.id) {
                // skipping while empty file input
                if (!req.file) {
                    next();
                    return;
                }
                const public_id = getPublicId(req.car.image);
                await cloudinary.uploader.destroy(public_id); //delete old pict
            }

            const fileBase64 = req.file.buffer.toString("base64"); //convert buffer to base64
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;
            const folderCloudinary = "car-api-challenge"; //folder in cloudinary console

            const uploadImg = await cloudinary.uploader.upload(file, {
                folder: folderCloudinary,
            });

            req.image = uploadImg.secure_url; //generated url

            next();
        } catch (error) {
            res.status(400).json({
                message: "Gagal Upload file!",
                err_msg: error.message,
            });
        }
    },

    async cloudinaryDelete(req, res, next) {
        try {
            const public_id = await getPublicId(req.car.image);
            await cloudinary.uploader.destroy(public_id)
            next();
        } catch (error) {
            res.status(400).json({
                status: "FAIL",
                message: `can't delete image!`,
            });
        }
    }
}