const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/openapi.json")
const controllers = require("../app/controllers");
const uploadImage = require("../app/middleware/uploadImage")
const cloudinaryUpload = require("../app/middleware/cloudinaryCar")
const apiRouter = express.Router();
const prefix = "/api/v1"

/**
 * TODO: Implement your own API
 *       implementations
 */

//API Docs
apiRouter.use("/", swaggerUi.serve);
apiRouter.get("/", swaggerUi.setup(swaggerDocument))

//Users
apiRouter.get(`${prefix}/current`,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.current
);

apiRouter.post(`${prefix}/admin/register`,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isSuperAdmin,
  controllers.api.v1.userController.registerAdmin);

apiRouter.post(`${prefix}/login`,
  controllers.api.v1.userController.login
);

//Cars
apiRouter.post(`${prefix}/cars`,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdmin,
  uploadImage,
  cloudinaryUpload.cloudinaryUpload,
  controllers.api.v1.carController.createCar
);

apiRouter.put(`${prefix}/cars/:id`,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdmin,
  cloudinaryUpload.checkCar,
  uploadImage,
  cloudinaryUpload.cloudinaryUpload,
  controllers.api.v1.carController.updateCar
);

apiRouter.delete(`${prefix}/cars/:id`,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdmin,
  cloudinaryUpload.checkCar,
  uploadImage,
  cloudinaryUpload.cloudinaryDelete,
  controllers.api.v1.carController.deleteCar
);

apiRouter.get(`${prefix}/cars`,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.carController.getAllCar
);

apiRouter.get(`${prefix}/cars/:id`,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.carController.getAllCarById
);

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
