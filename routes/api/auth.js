const express = require("express");

const controllers = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middleWares");
const { registerSchema, loginSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), controllers.register);

router.post("/login", validateBody(loginSchema), controllers.login);

router.get("/current", authenticate, controllers.getCurrent);

router.post("/logout", authenticate, controllers.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), controllers.updateAvatar);

module.exports = router;



// const express = require('express');
// const Joi = require('joi');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
// const authenticate = require('../middleWares/authenticate');


// const router = express.Router();



// // register
// const registrationSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

// router.post('/register', async (req, res) => {
//   try {
//     const { error } = registrationSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const { email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Email in use' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       subscription: 'starter', 
//     });

//     await newUser.save();

//     res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


// // login
// const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { error } = loginSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Email or password is wrong' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Email or password is wrong' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'F1hyuGhyu678', { expiresIn: '1h' });

//     res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


// router.use(authenticate);

// // logout
// router.post('/logout', authenticate, async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(401).json({ message: 'Not authorized' });
//     }

//     user.token = null;
//     await user.save();

//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// });

// // current

// router.get('/current', authenticate, async (req, res, next) => {
//   try {
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: 'Not authorized' });
//     }

//     res.json({
//       email: user.email,
//       subscription: user.subscription,
//     });
//   } catch (error) {
//     next(error);
//   }
// });



// module.exports = router;

















// const express = require("express");

// const { validateBody } = require("../../middlewares")
// const { register} = require("../../controllers/auth")

// const { schemas } = require("../../models/user");

// const router = express.Router();


// router.post("/register", validateBody(schemas.registerSchema), register)

// module.exports = router;


