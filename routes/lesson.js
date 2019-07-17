const express = require("express");
const router = express.Router();
const passport = require("passport");

const lessonsController = require("../controllers/lesson.js");

router.get("/", lessonsController.index);
router.get("/title/:title", lessonsController.findByTitle);
router.get("/id/:id", lessonsController.findById);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  lessonsController.create
);
router.put(
  "/edit/:title",
  passport.authenticate("jwt", { session: false }),
  lessonsController.update
);
router.delete(
  "/delete/:title",
  passport.authenticate("jwt", { session: false }),
  lessonsController.delete
);

module.exports = router;
