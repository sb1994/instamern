const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/User')
const Post = require('../models/Post')

router.get('/test', (req, res) => res.json({ msg: 'Posts Routes Works' }))
router.get('/all', (req, res) =>
  Post.find({}, (posts) => {
    res.json(posts)
  })
)
router.get('/:feed_id/feed', (req, res) =>
  Post.find({ feed_id: req.params.feed_id }, (posts) => {
    res.json(posts)
  })
)
router.get('/:user_id', (req, res) =>
  Post.find({ user: req.params.user_id }, (posts) => {
    console.log(posts)

    res.json(posts)
  })
)
router.post(
  '/:feed_id/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // let newPost = new Post({})
    Post.find({ user: req.params.feed_id }, (posts) => {
      console.log(posts)

      res.json(posts)
    })
  }
)

module.exports = router
