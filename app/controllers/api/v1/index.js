/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const carController = require("./carController");
const userController = require("./userController");

module.exports = {
  carController,
  userController
};
