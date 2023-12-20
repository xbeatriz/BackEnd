
var jwt = require("jsonwebtoken");
const { User } = require("../models/models");

let secret = "7a+RK(&o8gJJzR^uX,39GJ!VG&s";

const generateToken = (user_info, callback) => {
  let token = jwt.sign(
    {
      data: user_info,
    },
    secret,
    { expiresIn: "24h" }
  );
  return callback(token);
};

const validateToken = (token, callback) => {
  if (!token) {
    return callback(false, null);
  }
  jwt.verify(token.replace("Bearer ", ""), secret, function (error, decoded) {
    let loggedUser = decoded.data.user;
    User.findOne({ email: loggedUser }).then((user) => {
      if (user) {
        return callback(true, loggedUser);
      } else {
        return callback(false, null);
      }
    }).catch(()=> {
        return callback(false, null);
    });
  });
};

exports.generateToken = generateToken;
exports.validateToken = validateToken;