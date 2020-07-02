const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const keys = require("../../config/key");
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.get("/all", (req, res) => {
  const errors = {};

  //checks wether the username or email already exists
  User.find({})
    .then(users => {
      if (users) {
        return res.status(200).json(users);
      }
    })
    .catch(err => res.json(err));
  // // console.log(req.body);
});
router.post("/register", (req, res) => {
  const errors = {};

  //checks wether the username or email already exists
  User.findOne({
    $or: [
      {
        email: req.body.email
      },
      { name: req.body.name }
    ]
  })
    .then(user => {
      if (user) {
        errors.email = "Email or Name already exists";
        return res.status(200).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          profile_pic:
            "https://ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png",
          password: req.body.password
        });
        // console.log(newUser);
        // res.json({ user: newUser })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {
                  id: user.id,
                  name: user.name,
                  profile_pic: user.profile_pic,
                  email: user.email
                };
                jwt.sign(
                  payload,
                  process.env.SECRET,
                  { expiresIn: 3600 * 1000 * 1000 * 20 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: `${token}`
                    });
                  }
                );
              })
              .catch(err => res.json(err));
            // console.log(newUser);
          });
        });
      }
    })
    .catch(err => res.json(err));
  // // console.log(req.body);
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // // //find user by email
  User.findOne({
    email: email
  }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User Not Found" });
    }
    // console.log(user);
    // //check the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        //user matched create the payload taht will
        // be sent in the token

        const payload = {
          id: user.id,
          name: user.name,
          profile_pic: user.profile_pic,
          email: user.email
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 3600 * 1000 * 1000 * 20 },
          (err, token) => {
            res.json({
              success: true,
              token: `${token}`
            });
          }
        );
      } else {
        return res.status(200).json({ msg: "password failed" });
      }
    });
  });
});
module.exports = router;
