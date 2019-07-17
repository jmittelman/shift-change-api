const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const lessonsRouter = require("./routes/lesson");
const agendasRouter = require("./routes/agenda");
const usersRouter = require("./routes/user");

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/", expres.static("./apidoc"));

app.use("/api/lessons", lessonsRouter);
app.use("/api/agendas", agendasRouter);
app.use("/api/users", usersRouter);

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("listening on port" + app.get("port"));
});
