var jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, "secret", function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    req.userfirst = decoded.firstName;
    req.userlast = decoded.lastName;
    req.useremail = decoded.email;
    req.userpassword = decoded.password;
    req.userroles = decoded.roles;
    next();
  });
}

module.exports = verifyToken;
