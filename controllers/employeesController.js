const data = {
  employees: require("../model/employee.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getEmployees = (req, res) => {
  res.json(data.employees);
};

const createEmployees = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    res.status(400).json({ message: "Data not provided" });
  }

  data.setEmployees([...data.employees, newEmployee]);

  res.status(201).json(data.employees);
};

const updateEmployees = (req, res) => {
  const toUpdate = data.employees.find(
    (data) => data.id === parseInt(req.body.id)
  );
  if (!toUpdate) {
    return res
      .status(400)
      .json({ message: `Employee id:${req.body.id} not found` });
  }

  if (req.body.firstname) toUpdate.firstname = req.body.firstname;
  if (req.body.lastname) toUpdate.lastname = req.body.lastname;

  const filteredArray = data.employees.filter(
    (data) => data.id !== parseInt(req.body.id)
  );

  const unsortedArray = [...filteredArray, toUpdate];

  const sortedArray = unsortedArray.sort((a, b) =>
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  );

  data.setEmployees(sortedArray);

  res.json(data.employees);
};

const deleteEmployees = (req, res) => {
  const findArray = data.employees.find(
    (data) => data.id === parseInt(req.body.id)
  );

  if (!findArray) {
    return res.status(404).json({
      message: `Error: ${req.body.id} not found`,
    });
  }
  const filteredArray = data.employees.filter(
    (data) => data.id !== req.body.id
  );
  data.setEmployees([...filteredArray]);
  ``;
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const findArray = data.employees.find(
    (data) => data.id === parseInt(req.params.id)
  );
  if (!findArray) {
    return res.status(404).json({
      message: `Error: ${req.params.id} not found`,
    });
  }
  res.json(findArray);
};

console.log(data);

module.exports = {
  createEmployees,
  updateEmployees,
  getEmployee,
  getEmployees,
  deleteEmployees,
};
