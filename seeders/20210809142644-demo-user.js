const bcrypt = require("bcryptjs");
("use strict");

const salt = bcrypt.genSaltSync(10);
const password = "111111";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        name: "abybandit",
        email: "axae@my.com",
        dob: new Date(),
        password: bcrypt.hashSync(password, salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Users", null, {});
    };
  },
};
