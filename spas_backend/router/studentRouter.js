const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router
    .route("/student/project/list")
    .get(userController.protect, userController.studentProjectList);

router
    .route("/student/project/add/preferences")
    .post(userController.protect, userController.studentProjectAddToPreferences);

router
    .route("/student/project/arrange")
    .post(
        userController.protect,
        userController.studentProjectsPreferencesReArrange
    );

router
    .route("/student/project/list/submit")
    .post(userController.protect, userController.studentProjectListSubmit)

router
    .route("/student/schedule/appointment")
    .post(userController.protect, userController.updateSlotStatus)

router
    .route("/student/list/projectProposals")
    .get(userController.protect, userController.studentProjectProposalList);

router
    .route("/student/fetch/meetingslots/:id")
    .get(userController.protect, userController.fetchMeetingSlots);

module.exports = router;
