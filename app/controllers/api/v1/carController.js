const carService = require("../../../services/carService");

module.exports = {
    async createCar(req, res) {
        const { name, price, size, available } = req.body;
        const image = req.image;
        const createdBy = req.user.id;

        carService
            .create({
                name,
                price,
                size,
                available,
                image,
                createdBy
            })
            .then((car) => {
                res.status(201).json({
                    status: "OK",
                    data: car
                })
            })
    },
    async updateCar(req, res) {
        try {
            const car = req.car;
            const updatedBy = req.user.id;
            const carPayload = req.body;
            const image = req.image || car.image;
            const size = req.body.size || car.size;

            const uploadPayload = {
                name: carPayload.name,
                price: carPayload.price,
                size,
                image,
                available: carPayload.available,
                updatedBy
            }
            await carService.update(car.id, uploadPayload);
            res.status(200).json({
                status: "OK",
                message: "Success",
                data: {
                    name: uploadPayload.name,
                    price: uploadPayload.price,
                    size: uploadPayload.size,
                    image: uploadPayload.image,
                    available: uploadPayload.available,
                    updateBy: uploadPayload.updateBy
                }
            })
        } catch (error) {
            res.status(404).json({
                status: "Error bang",
                message: error.message
            })
        }
    },
    async deleteCar(req, res) {
        try {
            await carService.delete(req);
            res.status(200).json({
                status: "OK",
                message: "Success"
            })
        } catch (error) {
            return error.message
        }
    },
    async getAllCar(req, res) {
        try {
            const cars = await carService.getAll();
            res.status(200).json({
                status: "OK",
                data: cars
            })
        } catch (error) {
            return error.message;
        }
    },
    async getAllCarById(req, res) {
        try {
            const carsId = req.params.id;
            const carPayload = await carService.getAllById(carsId);

            res.status(200).json({
                status: "OK",
                message: "Successss",
                data: carPayload
            })
        } catch (error) {

        }
    }
}