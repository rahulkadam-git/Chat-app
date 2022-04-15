const router = require("express").Router();
const controller = require("../controller/auth.controller");

router.post("/auth/login", controller.login);
router.post("/auth/register", controller.registerUser);
router.get("/allusers", controller.allUsers);

module.exports = router;
