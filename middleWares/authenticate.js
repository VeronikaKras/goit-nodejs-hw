const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;




// const jwt = require('jsonwebtoken');
// const User = require('../models/user'); // Assuming you have a User model

// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, 'your-secret-key');
//     const userId = decodedToken.userId;

//     // Find the user by ID from the token
//     const user = await User.findById(userId);

//     if (!user || token !== user.token) {
//       return res.status(401).json({ message: 'Not authorized' });
//     }

//     // Attach user information to the request
//     req.user = { _id: user._id, email: user.email, subscription: user.subscription };

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: 'Not authorized' });
//   }
// };

// module.exports = authenticate;

