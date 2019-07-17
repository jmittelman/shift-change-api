const Agenda = require("../db/models/Agenda");
const User = require("../db/models/User");

module.exports = {
  /**
   * @api {get} /api/agendas/ Request All Agendas
   * @apiName GetAgendas
   * @apiGroup Agenda
   */
  index: (req, res) => {
    Agenda.find()
      .then(agendas => {
        res.json(agendas);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {get} /api/agendas/date/:date Request Agenda By Date
   * @apiName GetAgendaByDate
   * @apiGroup Agenda
   *
   * @apiParam {String} date Agenda's Date
   */
  findByDate: (req, res) => {
    Agenda.findOne({ date: req.params.date })
      .then(agenda => {
        res.json(agenda);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {get} /api/agendas/id/:id Request Agenda By id
   * @apiName GetAgendaById
   * @apiGroup Agenda
   *
   * @apiParam {String} id Agenda's id
   */
  findById: (req, res) => {
    Agenda.findById(req.params.id)
      .populate("lesson")
      .populate("author")
      .then(agenda => {
        res.json(agenda);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {get} /api/agendas/author/:id Request Agenda By Author User
   * @apiName GetAgendaByAuthor
   * @apiGroup Agenda
   *
   * @apiParam {Object} author Author User's id
   */
  findByAuthor: (req, res) => {
    Agenda.findById({ author: req.params.id })
      .then(agenda => {
        res.json(agenda);
      })
      .catch(err => {
        console.log(err);
      });
  },

  /**
   * @api {post} /api/agendas/ Create New Agenda
   * @apiName CreateAgenda
   * @apiGroup Agenda
   *
  
   */
  create: (req, res) => {
    Agenda.create(req.body).then(agenda => {
      res.json(agenda);
      //   Lesson.findById(agenda.lesson).then(lesson => {
      //     lesson.agendas.push(agenda._id);
      //     lesson.save();
      //   });
      User.findById(agenda.author).then(user => {
        user.myAgendas.push(agenda._id);
        user.save();
      });
    });
  },
  /**
   * @api {put} /api/agendas/edit/:id Edit an Existing Agenda
   * @apiName EditAgenda
   * @apiGroup Agenda
   *
   * @apiParam {String} id Agenda's id
   * @apiParam (Request body (JSON)) {String} date Date of the Agenda
   * @apiParam (Request body (JSON)) {String} announcements Announcements Featured in the Agenda
   * @apiParam (Request body (JSON)) {String} tasks Tasks Featured in the Agenda
   * @apiParam (Request body (JSON)) {String} shoutOuts Shout Outs Featured in the Agenda
   * @apiParam (Request body (JSON)) {Object} lesson Lesson Featured in the Agenda
   * @apiParam (Request body (JSON)) {Object} author Author User of the Agenda
   */
  update: (req, res) => {
    Agenda.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
      .populate("lesson")
      .populate("author")
      .then(agenda => res.json(agenda));
  },
  /**
   * @api {delete} /api/agendas/delete/:id Delete an Existing Agenda
   * @apiName DeleteAgenda
   * @apiGroup Agenda
   *
   * @apiParam {String} id Agenda's id
   */
  delete: (req, res) => {
    Agenda.findByIdAndDelete(req.params.id).then(agenda => res.json(agenda));
  }
};
