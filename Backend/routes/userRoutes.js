const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/getusers", userController.getUsers);
router.post("/adduser", userController.addUser);
router.put("/edituser/:id", userController.editUser);
router.delete("/deleteuser/:id", userController.deleteUser);



module.exports = router;
