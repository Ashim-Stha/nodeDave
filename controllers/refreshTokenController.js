const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  const findUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!findUser) return res.sendStatus(403); //Forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || findUser.username !== decoded.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30s",
      }
    );

    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
