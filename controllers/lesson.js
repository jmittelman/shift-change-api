const Lesson = require("../db/models/Lesson");

module.exports = {
  /**
   * @api {get} /api/lessons/ Request All Lessons
   * @apiName GetLessons
   * @apiGroup Lesson
   */

  index: (req, res) => {
    Lesson.find()
      .then(lessons => {
        res.json(lessons);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {get} /api/lessons/title/:title Request Lesson By Title
   * @apiName GetLessonByTitle
   * @apiGroup Lesson
   *
   * @apiParam {String} title Lesson's Title
   */
  findByTitle: (req, res) => {
    Lesson.findOne({ title: req.params.title })
      .then(lesson => {
        res.json(lesson);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {get} /api/lessons/id/:id Request Lesson By id
   * @apiName GetLessonById
   * @apiGroup Lesson
   *
   * @apiParam {String} id Lesson's id in the Database
   */
  findById: (req, res) => {
    Lesson.findById(req.params.id)
      //   .populate("agendas")
      .then(lesson => {
        res.json(lesson);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {post} /api/lessons/ Create a New Lesson
   * @apiName CreateLesson
   * @apiGroup Lesson
   *
   * @apiDescription These are all optional fields to include in the request body. Only Title is required
   * @apiParam (Request body (JSON)) {String} title Title of the Lesson
   * @apiParam (Request body (JSON)) {String} category Category of the Lesson
   * @apiParam (Request body (JSON)) {String} details Details of the Lesson
   */
  create: (req, res) => {
    Lesson.create(req.body).then(lesson => {
      res.json(lesson);
    });
  },
  /**
   * @api {put} /api/lessons/edit/:title Edit an Existing Lesson
   * @apiName EditLesson
   * @apiGroup Lesson
   *
   * @apiParam {String} title title of the Lesson
   * @apiParam (Request body (JSON)) {String} category Category of the Lesson
   * @apiParam (Request body (JSON)) {String} details Details of the Lesson
   */
  update: (req, res) => {
    Lesson.findOneAndUpdate({ title: req.params.title }, req.body, {
      new: true
    }).then(lesson => res.json(lesson));
  },
  /**
   * @api {delete} /api/lessons/delete/:title Delete an Existing Lesson
   * @apiName DeleteLesson
   * @apiGroup Lesson
   *
   * @apiParam {String} title Lesson's Title
   */
  delete: (req, res) => {
    Lesson.findOneAndDelete({ title: req.params.title }).then(lesson =>
      res.json(lesson)
    );
  }
};
