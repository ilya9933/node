const express = require("express");
const controllers = require("../controllers/auth");
const router = express.Router();
const token = require("../middleware/checToken");
const { check } = require("express-validator");

router.post(
  "/login",
  [
    check("email", "All fields must be filled").notEmpty(),
    check("password", "All fields must be filled").notEmpty(),
  ],
  controllers.login
);
router.post(
  "/register",
  [
    check("email", "All fields must be filled").notEmpty(),
    check("password", "All fields must be filled").notEmpty(),
    check("name", "All fields must be filled").notEmpty(),
    check("dob", "All fields must be filled").notEmpty(),
  ],
  controllers.register
);
router.get("/get", token.tokenChecking, controllers.getUsers);
router.post("/update", token.tokenChecking, controllers.update);
router.delete("/delete", token.tokenChecking, controllers.delete);

module.exports = router;
