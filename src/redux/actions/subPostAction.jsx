import {
  DOWN_VOTE,
  GET_HOT,
  GET_NEW,
  GET_POST,
  GET_THREAD,
  GET_TOP,
  UP_VOTE,
} from "../constants/RedditConstant";

export const getHotPost = () => {
  return {
    type: GET_HOT,
    payload: "",
  };
};
export const getNewPost = () => {
  return {
    type: GET_NEW,
    payload: "",
  };
};
export const getTopPost = () => {
  return {
    type: GET_TOP,
    payload: "",
  };
};
export const getPost = (page, list) => {
  return {
    type: GET_POST,
    payload: {
      page: page,
      data: list,
    },
  };
};
export const getThread = (thread) => {
  return {
    type: GET_THREAD,
    payload: {
      data: thread,
    },
  };
};
export const upVote = (vote, id) => {
  return {
    type: UP_VOTE,
    payload: {
      vote: vote,
      postId: id,
    },
  };
};
export const downVote = (vote, id) => {
  return {
    type: DOWN_VOTE,
    payload: {
      vote: vote,
      postId: id,
    },
  };
};
