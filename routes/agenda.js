const express = require("express");
const router = express.Router();
const passport = require("passport");

const agendasController = require("../controllers/agenda.js");

router.get("/", agendasController.index);
router.get("/date/:date", agendasController.findByDate);
// router.get("/agenda/:id", agendasController.findByAgenda);
router.get("/id/:id", agendasController.findById);
router.get("/author/:id", agendasController.findByAuthor);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  agendasController.create
);
router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  agendasController.update
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  agendasController.delete
);

module.exports = router;
