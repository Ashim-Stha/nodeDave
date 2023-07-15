const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  //On client,also delete the accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //is refresh token in db?
  const findUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!findUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== refreshToken
  );

  const currentUser = { ...findUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //secure:true also if we use https
  res.sendStatus(204);
};

module.exports = handleLogout;
