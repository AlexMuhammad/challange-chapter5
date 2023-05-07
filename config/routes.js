const express = require("express");
const controllers = require("../app/controllers");
const uploadImage = require("../app/middleware/uploadImage")
const cloudinaryUpload = require("../app/middleware/cloudinaryCar")
const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */

//Users
apiRouter.get("/api/v1/current", controllers.api.v1.userController.authorize, controllers.api.v1.userController.current);
apiRouter.post("/api/v1/admin/register", controllers.api.v1.userController.authorize, controllers.api.v1.userController.isSuperAdmin, controllers.api.v1.userController.registerAdmin);
apiRouter.post("/api/v1/login", controllers.api.v1.userController.login);

//Cars
apiRouter.post("/api/v1/cars", controllers.api.v1.userController.authorize, controllers.api.v1.userController.isSuperAdmin, uploadImage, cloudinaryUpload.cloudinaryUpload, controllers.api.v1.carController.createCar);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.userController.authorize, controllers.api.v1.userController.isSuperAdmin, cloudinaryUpload.checkCar, uploadImage, cloudinaryUpload.cloudinaryUpload, controllers.api.v1.carController.updateCar);
apiRouter.delete("/api/v1/cars/:id", controllers.api.v1.userController.authorize, controllers.api.v1.userController.isSuperAdmin, cloudinaryUpload.checkCar, uploadImage, cloudinaryUpload.cloudinaryDelete, controllers.api.v1.carController.deleteCar);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
