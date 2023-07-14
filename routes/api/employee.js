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
} = require("../../controllers/employeesController");

router
  .route("/")
  .get(getEmployees)
  .post(createEmployees)
  .put(updateEmployees)
  .delete(deleteEmployees);

router.route("/:id").get(getEmployee);

module.exports = router;
