const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.use(userController.logRequestResponse);

router
    .route("/auth")
    .get(userController.protect, userController.dashboard)
    .post(userController.userLogin)
    .patch(userController.userSignUp);

router
    .route("/fetch/deadlines")
    .get(userController.protect, userController.getDeadlines);

module.exports = router;
