import axios from "axios";

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
  GET_COMMENT
} from "./action_types";
//get selected feed posts

export const getSelectedFeedPosts = feed_id => dispatch => {
  // dispatch(setPostLoading());
  // console.log(feed_id)
  if (feed_id === undefined) {
    console.log("feed_id undeined");
  } else {
    axios
      .get(`/api/posts/${feed_id}/feed`)
      // .get(`/api/posts/all`)
      .then(
        res => {
          console.log(res.data);
          if (res.data === null) {
            console.log("data null");
          } else {
            dispatch({
              type: GET_POSTS,
              payload: res.data
            });
          }
        }
        // console.log(res)
      )
      .catch(err =>
        dispatch({
          type: GET_POSTS,
          payload: null
        })
      );
  }
};
export const createPost = ({ feed_id, caption, post_pic }) => dispatch => {
  // dispatch(setPostLoading());

  console.log(feed_id, caption, post_pic);

  axios
    .post(`/api/posts/${feed_id}/create`, { caption, post_pic })
    .then(
      res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      // console.log(res.data)
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};
