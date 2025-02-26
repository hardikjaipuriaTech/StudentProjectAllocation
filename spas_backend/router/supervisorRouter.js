const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router
    .route("/supervisor/project/list")
    .get(userController.protect, userController.supervisorProjectList);

router
    .route("/supervisor/project/create")
    .post(userController.protect, userController.createProject);

router
    .route("/supervisor/create/meetingslots")
    .post(userController.protect, userController.createMeetingSlots);

module.exports = router;
