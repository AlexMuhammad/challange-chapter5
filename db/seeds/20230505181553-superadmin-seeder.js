'use strict';
const bcrypt = require("bcryptjs");
const SALT = 10

const encryptedPassword = async (password) => {
  try {
    const encryptPassword = await bcrypt.hash(password, SALT)
    return encryptPassword
  } catch (error) {
    return error
  }
}
module.exports = {
  async up(queryInterface, Sequelize) {
    const encryptPassword = await encryptedPassword("superadmin123")
    return queryInterface.bulkInsert('Users', [{
      name: 'Alex SuperAdmin',
      email: 'superadmin@mail.com',
      password: encryptPassword,
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
