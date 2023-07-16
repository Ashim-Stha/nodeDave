const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password)
    return res.status(400).json({
      message: "Data not provided",
    });

  const findUser = await User.findOne({ username: user }).exec();
  if (!findUser)
    return res.status(401).json({
      message: `Username ${user} not found`,
    });

  const result = await bcrypt.compare(password, findUser.password);
  if (result) {
    const roles = Object.values(findUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: findUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30s",
      }
    );

    const refreshToken = jwt.sign(
      { username: findUser.username },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    findUser.refreshToken = refreshToken;
    const result = await findUser.save();
    console.log(result);

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: "true",
    //   maxAge: 60 * 24 * 24 * 1000,
    // });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 60 * 24 * 24 * 1000,
    });
    //we are removing secure option so that we can test in dev environment like thunder client

    res.json({
      accessToken,
    });
  } else {
    res.status(401).json({
      message: "Wrong password",
    });
  }
};

module.exports = handleLogin;
