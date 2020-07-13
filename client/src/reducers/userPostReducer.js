import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  ADD_COMMENT
} from "../actions/action_types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  postAdded: false
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        postAdded: true
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case ADD_COMMENT:
      // console.log(action.payload.post.comments);

      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default post;
