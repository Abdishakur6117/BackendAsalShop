const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

const auth = (role) => {
  // console.log(role);
  return async (req, res, next) => {
    const token = req.headers["token"];
    if (!token)
      return res
        .status(403)
        .send({ status: false, message: "you are not authenticated" });
    jwt.verify(
      token,
      "lYOXXekJDjkqQ6U7kg9i5s3gaJPm4BLzF8PjK45d3dd60e97e3ee3a9ecomerce",
      async (error, decoded) => {
        if (error)
          return res
            .status(401)
            .send({ status: false, message: "invalid token" });
        const loginUserdata = await userModel.findById(decoded.id);
        if (!loginUserdata)
          return res.send({ status: false, message: "user not found" });
        // console.log("loginUserdata", loginUserdata.role, role);
        if (!role.includes(loginUserdata.role))
          return res
            .status(401)
            .send({ status: false, message: "un-authorized" });
        req.user = loginUserdata;
        next();
      }
    );
  };
};

module.exports = { auth };
