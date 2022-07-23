import axios from "axios";
import { BASE_URL } from "./configURL";

export const threadService = {
  getThread: (searchData) => {
    return axios.get(`${BASE_URL}/r/DotA2/comments/${searchData}.json`);
  },
};
