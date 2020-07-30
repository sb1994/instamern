import axios from 'axios'

import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING,
  DELETE_POST,
  CLEAR_INPUT_ERRORS,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
  GET_COMMENT,
  DELETE_POSTS,
} from './action_types'
//get selected feed posts
export const getSelectedFeedPosts = (feed_id) => (dispatch) => {
  // dispatch(setPostLoading());
  // console.log(feed_id)
  if (feed_id === undefined) {
    console.log('feed_id undeined')
  } else {
    axios
      .get(`/api/posts/${feed_id}/feed`)
      .then(
        (res) => {
          // console.log(res.data)
          if (res.data === null) {
            console.log('data null')
          } else {
            // console.log(res.data)
            dispatch({
              type: GET_POSTS,
              payload: res.data,
            })
          }
        }
        // console.log(res)
      )
      .catch((err) =>
        dispatch({
          type: GET_POSTS,
          payload: null,
        })
      )
  }
}
export const createPost = ({ feed_id, caption, post_pic }) => (dispatch) => {
  // dispatch(setPostLoading());

  console.log(feed_id, caption, post_pic)

  axios
    .post(`/api/posts/${feed_id}/create`, { caption, post_pic })
    .then(
      (res) =>
        dispatch({
          type: GET_POSTS,
          payload: res.data,
        })
      // console.log(res.data)
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    )
}
export const deletePosts = () => (dispatch) => {
  //testing function
  axios
    .delete('/api/posts/delete')
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: DELETE_POSTS,
        payload: res.data,
      })
    })
    .catch({
      type: GET_ERRORS,
      payload: 'errors',
    })
}
export const createComment = ({ post, comment }) => (dispatch) => {
  //testing function
  console.log(post, comment)
  axios
    .post(`/api/posts/${post}/comment/create`, { comment })
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      })
    })
    .catch((err) => {
      console.log(err)
    })
  // axios
  //   .delete('/api/posts/delete')
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  //   .catch({
  //     type: GET_ERRORS,
  //     payload: 'errors',
  //   })
}
