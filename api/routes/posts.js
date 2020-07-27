const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get('/test', (req, res) => res.json({ msg: 'Posts Routes Works' }))
router.get('/all', (req, res) =>
  Post.find()
    .populate('user')
    .then((posts) => {
      res.json(posts)
    })
)
router.get('/:user_id', (req, res) =>
  Post.find({ user: req.params.user_id }, (posts) => {
    console.log(posts)

    res.json(posts)
  })
)
router.get('/:feed_id/feed', (req, res) =>
  Post.find({ feed_id: req.params.feed_id })
    .populate('user')
    .then((posts) => {
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
    // console.log(req.user)
    let { user } = req
    let { caption, post_pic, longitude, latitude } = req.body
    let { feed_id } = req.params
    // console.log(caption, post_pic)
    if (post_pic === null && caption !== '') {
      let newPost = new Post({
        caption,
        feed_id,
        longitude,
        latitude,
        post_pic: '',
        user: user._id,
      })
      newPost.save().then((post) => {
        Post.find({ feed_id: post.feed_id })
          .populate('user')
          .then((posts) => {
            res.json(posts)
          })
      })
    } else {
      let newPost = new Post({
        caption,
        feed_id,
        longitude,
        latitude,
        post_pic,
        user: user._id,
      })
      newPost.save().then((post) => {
        Post.find({ feed_id: post.feed_id })
          .populate('user')
          .then((posts) => {
            res.json(posts)
          })
      })
    }
  }
)
router.post(
  '/:post_id/comment/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { post_id } = req.params
    let { comment } = req.body
    let { user } = req
    // console.log(text);

    let newComment = new Comment({
      post: post_id,
      comment,
      user: user._id,
    })

    newComment.save().then((comment) => {
      res.json(comment)
    })

    // console.log(req.params,);
    // res.json({ msg: newComment });
  }
)

module.exports = router
