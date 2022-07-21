import {
  GET_HOT,
  GET_NEW,
  GET_POST,
  GET_TOP,
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
