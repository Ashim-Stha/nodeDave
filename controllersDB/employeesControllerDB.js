const Employee = require("../model/Employee");

const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({
      message: "No employees found",
    });

  res.json(employees);
};

const createEmployees = async (req, res) => {
  const { f_name, l_name } = req.body;
  if (!f_name || !l_name)
    return res.status(400).json({
      message: "First and last name are required",
    });

  try {
    const newEmployee = await Employee.create({
      firstname: f_name,
      lastname: l_name,
    });

    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployees = async (req, res) => {
  const { f_name, l_name, id } = req.body;

  if (!id)
    return res.status(400).json({
      message: "ID is required",
    });

  const findEmployee = await Employee.findOne({ _id: id }).exec();
  if (!findEmployee)
    return res.status(204).json({
      message: `No employee matches ${id} `,
    });

  if (f_name) findEmployee.firstname = f_name;
  if (l_name) findEmployee.lastname = l_name;

  const result = await findEmployee.save();
  res.json(result);
};

const deleteEmployees = async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({
      message: "ID is required",
    });

  const findEmployee = await Employee.findOne({ _id: id }).exec();
  if (!findEmployee)
    return res.status(204).json({
      message: `No employee matches ${id} `,
    });

  const result = await findEmployee.deleteOne({ _id: id });

  res.json(result);
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      message: "ID is required",
    });

  const findEmployee = await Employee.findOne({ _id: id }).exec();
  if (!findEmployee)
    return res.status(204).json({
      message: `No employee matches ${id} `,
    });

  res.json(findEmployee);
};

module.exports = {
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployees,
  getEmployee,
};
