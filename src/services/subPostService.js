import axios from "axios";
import { BASE_URL } from "./configURL";

export const subPostService = {
  getSubPostList: (searchData, newPost) => {
    return axios.get(
      `${BASE_URL}/r/${searchData}.json?count=25&after=${newPost}`
    );
  },
  getHotPostList: (searchData, newPost) => {
    return axios.get(
      `${BASE_URL}/r/${searchData}/hot.json?count=25&after=${newPost}`
    );
  },
  getNewPostList: (searchData, newPost) => {
    return axios.get(
      `${BASE_URL}/r/${searchData}/new.json?count=25&after=${newPost}`
    );
  },
  getTopPostList: (searchData, newPost) => {
    return axios.get(
      `${BASE_URL}/r/${searchData}/top.json?count=25&after=${newPost}`
    );
  },
};
