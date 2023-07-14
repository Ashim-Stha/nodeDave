const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({
      message: "Not provided",
    });
  const userExist = userDB.users.find((person) => person.username === user);
  if (!userExist)
    return res.status(401).json({
      message: "User not found",
    }); //unauthorized

  const match = await bcrypt.compare(password, userExist.password);
  if (match) {
    res.status(201).json({
      success: `User ${user} logged in`,
    });
  } else {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = handleLogin;
