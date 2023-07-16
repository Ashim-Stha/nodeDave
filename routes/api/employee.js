// const express = require("express");
// const router = express.Router();

// const data = {};
// data.employees = require("../../data/employee.json");

// router
//   .route("/")
//   .get((req, res) => {
//     res.json(data.employees);
//   })
//   .post((req, res) => {
//     res.json({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//     });
//   })
//   .put((req, res) => {
//     res.json({
//       id: req.body.id,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//     });
//   })
//   .delete((req, res) => {
//     res.json({ id: req.body.id });
//   });

// router.route("/:id").get((req, res) => {
//   res.json({
//     id: req.params.id,
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createEmployees,
  updateEmployees,
  getEmployee,
  getEmployees,
  deleteEmployees,
} = require("../../controllersDB/employeesControllerDB");

const ROLES_LIST = require("../../config/rolesList");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(getEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployees)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployees)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployees);

router.route("/:id").get(getEmployee);

module.exports = router;
