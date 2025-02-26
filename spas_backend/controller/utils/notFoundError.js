const express = require("express");
const router = express.Router();
router.route("/check/network").get((req, res) => {
  res.status(200).json({
    status: "success",
    message: "You are connected",
  });
});

router
  .route("*")
  .all((req, res) => {
    res.status(404).json({
      status: "error",
      message: "Url not found",
    });
  })

module.exports = router;
