const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user.js");

router.get("/", userController.index);
router.get("/id/:id", userController.findById);
router.get("/email/:email", userController.findByEmail);
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  userController.update
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  userController.delete
);

module.exports = router;
