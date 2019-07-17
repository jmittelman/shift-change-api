const Lesson = require("./models/Lesson");
const Agenda = require("./models/Agenda");
const User = require("./models/User");

const lessonsData = require("./data/lessonData.json");
const usersData = require("./data/userData.json");

Lesson.deleteMany({})
  .then(() => {
    Lesson.create(lessonsData).then(lessonDocs => {
      console.log(lessonDocs);
    });
  })
  .catch(err => {
    console.log(err);
  });

User.deleteMany({})
  .then(() => {
    User.create(usersData).then(userDocs => {
      console.log(userDocs);
    });
  })
  .catch(err => {
    console.log(err);
  });

Agenda.deleteMany({}).then(_ => console.log("Wiped agendas"));
