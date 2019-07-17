const User = require("../db/models/User");
const jwt = require("jwt-simple");
const config = require("../config/config");

module.exports = {
  /**
   * @api {get} /api/users/ Request All Users
   * @apiName GetUsers
   * @apiGroup User
   */
  index: (req, res) => {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {get} /api/users/id/:id Request User By id
   * @apiName GetUserById
   * @apiGroup User
   *
   * @apiParam {String} id User's id in the Database
   */
  findById: (req, res) => {
    User.findById(req.params.id)
      .populate("myAgendas")
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {get} /api/users/email/:email Request User By Email
   * @apiName GetUserByEmail
   * @apiGroup User
   *
   * @apiParam {String} email User's Email in the Database
   */
  findByEmail: (req, res) => {
    User.findOne({ email: req.params.email })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * @api {post} /api/users/ Create a New User
   * @apiName CreateUser
   * @apiGroup User
   *
  
   */

  create: (req, res) => {
    User.create(req.body).then(user => {
      res.json(user);
    });
  },
  /**
   * @api {put} /api/users/edit/:id Edit an Existing User
   * @apiName EditUser
   * @apiGroup User
   *
   * @apiParam {String} id User's id
   * @apiParam (Request body JSON)) {String} firstName First Name of the User
   * @apiParam (Request body JSON)) {String} lastName Last Name of the User
   * @apiParam (Request body JSON)) {String} email Email of the User
   * @apiParam (Request body JSON)) {String} password Password of the User
   * @apiParam (Request body JSON)) {[Object]} myAgendas Agendas the User has Created
   */
  update: (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    }).then(user => res.json(user));
  },
  /**
   * @api {delete} /api/users/id/:id Delete an Existing User
   * @apiName DeleteUser
   * @apiGroup User
   *
   * @apiParam {String} id User's id
   */
  delete: (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id }).then(user => res.json(user));
  },
  /**
   * @api {post} /api/users/signup User Signup
   * @apiName SignupUser
   * @apiGroup User
   *
   * @apiParam (Request body JSON)) {String} firstName First Name of the User
   * @apiParam (Request body JSON)) {String} lastName Last Name of the User
   * @apiParam (Request body JSON)) {String} email Email of the User
   * @apiParam (Request body JSON)) {String} password Password of the User
   * @apiParam (Request body JSON)) {[Object]} myAgendas Agendas the User has Created
   */
  signup: (req, res) => {
    if (req.body.email && req.body.password) {
      let newUser = req.body;
      User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
          User.create(newUser).then(user => {
            if (user) {
              var payload = {
                id: newUser.id
              };
              var token = jwt.encode(payload, config.jwtSecret);
              newUser.id = token;
              res.json({
                token: token,
                userID: user._id,
                name: user.firstName
              });
            } else {
              res.sendStatus(401);
            }
          });
        } else {
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(401);
    }
  },
  /**
   * @api {post} api/users/login User Login
   * @apiName LoginUser
   * @apiGroup User
   *
   * @apiParam (Request body JSON)) {String} firstName First Name of the User
   * @apiParam (Request body JSON)) {String} lastName Last Name of the User
   * @apiParam (Request body JSON)) {String} email Email of the User
   * @apiParam (Request body JSON)) {String} password Password of the User
   * @apiParam (Request body JSON)) {[Object]} myAgendas Agendas User Created
   */

  login: (req, res) => {
    if (req.body.email && req.body.password) {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          if (user.password === req.body.password) {
            var payload = {
              id: user.id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
              token: token,
              userID: user._id,
              name: user.firstName
            });
          } else {
            res.sendStatus(401);
          }
        } else {
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};
