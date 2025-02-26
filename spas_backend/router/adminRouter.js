const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router
    .route("/admin/project/delete/:id")
    .delete(userController.protect, userController.deleteProject);

router
    .route("/admin/project/date")
    .post(userController.protect, userController.adminProjectDate);

router
    .route("/admin/supervisor/save")
    .post(userController.protect, userController.adminSaveSupervisor);

router
    .route("/admin/project/update")
    .post(userController.protect, userController.updateProject);

router
    .route("/admin/project/list")
    .get(userController.protect, userController.adminProjectList);

router
    .route("/admin/proposed/list")
    .get(userController.protect, userController.adminProposedProjectList);

router
    .route("/admin/proposed/approve")
    .patch(userController.protect, userController.adminProposedProjectApprove);

router
    .route("/admin/proposed/reject")
    .patch(userController.protect, userController.adminProposedProjectReject);

router
    .route("/admin/student/list")
    .get(userController.protect, userController.adminStudentList);

router
    .route("/admin/supervisor/list")
    .get(userController.protect, userController.adminSupervisorList);

router
    .route("/admin/create/deadlines")
    .post(userController.protect, userController.createdeadlines);

router
    .route("/admin/student/list/submitted")
    .get(
        userController.protect,
        userController.adminStudentWithProjectListSubmitted
    );

router
    .route("/admin/student/list/assign")
    .get(
        userController.protect,
        userController.adminStudentWithProjectListAssign
    );

router
    .route("/admin/student/assign")
    .get(userController.protect, userController.adminStudentProjectAssign);

router
    .route("/admin/student/file/submitted")
    .get(
        userController.protect,
        userController.adminStudentWithProjectListFileSubmitted
    );

router
    .route("/admin/student/file/presented")
    .get(userController.protect, userController.studentFilePresented);

router
    .route("/admin/student/list/presented")
    .get(
        userController.protect,
        userController.adminStudentWithProjectListFilePresented
    );

module.exports = router;
