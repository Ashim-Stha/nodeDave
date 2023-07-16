const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const findUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!findUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || decoded.username !== findUser.username)
      return res.sendStatus(403);

    const roles = Object.values(findUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30s",
      }
    );

    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
