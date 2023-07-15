const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({
      message: "Data not provided",
    });

  const findUser = userDB.users.find((person) => person.username === user);
  if (!findUser)
    return res.status(401).json({
      message: `Username ${user} not found`,
    });

  const match = await bcrypt.compare(password, findUser.password);
  if (match) {
    const roles = Object.values(findUser.roles);

    //create JWT token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: findUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      {
        username: findUser.username,
      },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    //saving refreshToken with current user in db
    const otherUser = userDB.users.filter(
      (person) => person.username !== findUser.username
    );

    const currentUser = { ...findUser, refreshToken };
    userDB.setUsers([...otherUser, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );

    // res.status(201).json({
    //   success: "You are logged in",
    // });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, //equivalent to 1day
    });
    res.json({ accessToken });
  } else {
    res.status(401).json({
      message: "Wrong password",
    });
  }
};

module.exports = handleLogin;
