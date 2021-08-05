const express = require("express");
const controllers = require("../controllers/auth");
const router = express.Router();
const token = require("../checToken");

router.post("/login", controllers.login);
router.post("/register", controllers.register);
router.get("/get", token.tokenChecking, controllers.getUsers);
router.post("/update", token.tokenChecking, controllers.update);
router.delete("/delete", token.tokenChecking, controllers.delete);

module.exports = router;
