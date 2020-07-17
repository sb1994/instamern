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

export const getSelectedFeedPosts = feedId => dispatch => {
  // dispatch(setPostLoading());

  axios
    .get(`/api/posts/${feedId}/feed`)
    .then(
      res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      // console.log(res)
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};
export const createPost = ({ feedId, text, post_pic }) => dispatch => {
  // dispatch(setPostLoading());

  console.log(feedId, text, post_pic);

  // axios
  //   .get(`/api/posts/${feedId}/feed`)
  //   .then(
  //     res =>
  //       dispatch({
  //         type: GET_POSTS,
  //         payload: res.data
  //       })
  //     // console.log(res)
  //   )
  //   .catch(err =>
  //     dispatch({
  //       type: GET_POSTS,
  //       payload: null
  //     })
  //   );
};
