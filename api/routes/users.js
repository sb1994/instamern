const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/User')
const keys = require('../../config/key')
const { findById } = require('../models/User')
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        res.json(user)
      }
    })
  }
)
router.get('/all', async (req, res) => {
  const errors = {}
  // let {users = }
  try {
    const data = await User.find({})
      .populate('followers.user')
      .populate('following.user')
      .then((users) => {
        if (users) {
          return res.status(200).json(users)
        }
      })
    // const data = await User.aggregate([

    //     $match: null,
    //     {$project: {
    //       n: { $size: '$followers' },
    //     }},
    //   ,
    // ])
  } catch (error) {
    console.error(error.message)
  }

  //checks wether the username or email already exists
  // User
  //   .catch((err) => res.json(err))
  // // console.log(req.body);
})
router.get('/:id', (req, res) => {
  const errors = {}

  //checks wether the username or email already exists
  User.findById(req.params.id)
    .populate('followers.user')
    .populate('following.user')
    .then((user) => {
      if (user) {
        return res.status(200).json(user)
      }
    })
    .catch((err) => res.json(err))
  // // console.log(req.body);
})
router.post('/register', (req, res) => {
  const errors = {}

  //checks wether the username or email already exists
  User.findOne({
    $or: [
      {
        email: req.body.email,
      },
      { name: req.body.name },
    ],
  })
    .then((user) => {
      if (user) {
        errors.email = 'Email or Name already exists'
        return res.status(200).json(errors)
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          profile_pic:
            'http://www.culpepperandassociates.com/wp-content/uploads/2014/08/dummy-avatar.png',
          password: req.body.password,
        })
        // console.log(newUser);
        // res.json({ user: newUser })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then((user) => {
                const payload = {
                  _id: user.id,
                  name: user.name,
                  profile_pic: user.profile_pic,
                  email: user.email,
                }
                jwt.sign(
                  payload,
                  process.env.SECRET,
                  { expiresIn: 3600 * 1000 * 1000 * 20 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: `${token}`,
                    })
                  }
                )
              })
              .catch((err) => res.json(err))
            // console.log(newUser);
          })
        })
      }
    })
    .catch((err) => res.json(err))
  // // console.log(req.body);
})
router.post('/login', (req, res) => {
  const { email, password } = req.body

  // // //find user by email
  User.findOne({
    email: email,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: 'User Not Found' })
    }
    // console.log(user);
    // //check the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        //user matched create the payload taht will
        // be sent in the token

        const payload = {
          _id: user.id,
          name: user.name,
          profile_pic: user.profile_pic,
          email: user.email,
        }
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 3600 * 1000 * 1000 * 20 },
          (err, token) => {
            res.json({
              success: true,
              token: `${token}`,
            })
          }
        )
      } else {
        return res.status(200).json({ msg: 'password failed' })
      }
    })
  })
})
router.post(
  '/follow/:followee_id/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { followee_id } = req.params
    let { user } = req
    // console.log(user)

    User.findOneAndUpdate(
      {
        _id: user._id,
        'following.user': { $ne: followee_id },
      },
      {
        $addToSet: {
          following: { user: followee_id },
        },
      },
      (err) => {
        if (err) {
          console.log('Error:', err)
        } else {
          // res.json({ mess: 'it works' })
          User.findOneAndUpdate(
            {
              _id: followee_id,
              'followers.user': { $ne: user._id },
            },
            {
              $addToSet: {
                followers: { user: user._id },
              },
            },
            {
              new: true,
            },
            (err, searchedUser) => {
              if (err) {
                console.log('Error:', err)
              } else {
                User.findById(followee_id)
                  .populate('followers.user')
                  .populate('following.user')
                  .then((user) => {
                    // console.log(user);
                    res.json(user)
                  })
              }
            }
          )
        }
      }
    )
  }
)

// Look  at promise chaining
router.post(
  '/follow/:followee_id/remove',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { followee_id } = req.params
    let { user } = req
    // console.log(user)
    //currentUser
    User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $pull: {
          following: { user: followee_id },
        },
      },
      (err, updatedUser) => {
        if (err) {
          console.log('Error:', err)
        } else {
          //followee

          User.findOneAndUpdate(
            {
              _id: followee_id,
            },
            {
              $pull: {
                followers: { user: user._id },
              },
            },
            (err, updatedFollowedUser) => {
              if (err) {
                console.log('Error:', err)
              } else {
                //followee

                User.findById(followee_id)
                  .populate('followers.user')
                  .populate('following.user')
                  .then((followed_user) => {
                    res.json(followed_user)
                  })
              }
            }
          )
          // res.json(updatedUser)
        }
      }
    )
  }
)
module.exports = router
