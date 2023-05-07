const carRepository = require("../repositories/carRepository");

module.exports = {
    async create(requestBody) {
        try {
            const { name, price, size, image, available, createdBy } = requestBody;
            const carPayload = {
                name,
                price,
                size,
                image,
                available,
                createdBy
            }
            const payload = await carRepository.create(carPayload)
            return {
                id: payload.id,
                name: payload.name,
                size: payload.size,
                image: payload.image,
                available: payload.available,
                createdBy: payload.createdBy
            }
        } catch (error) {
            return error.message
        }
    },
    async update(id, updateBody) {
        try {
            const updateCar = await carRepository.update(id, updateBody);
            return updateCar
        } catch (error) {
            return error.message
        }
    },
    async delete(req) {
        try {
            const carId = req.car.id;
            const userId = req.user.id;
            await carRepository.update(carId, { deletedBy: userId });
            return await carRepository.delete(carId);
        } catch (error) {
            return error.message
        }
    }
}