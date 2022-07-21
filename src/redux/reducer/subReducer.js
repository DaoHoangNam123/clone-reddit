import { subPostService } from "../../services/subPostService";
import {
  GET_HOT,
  GET_NEW,
  GET_POST,
  GET_TOP,
} from "../constants/RedditConstant";

let initialState = {
  data: [],
  typePost: "",
  newPost: "",
};

export const subReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POST: {
      let cloneData = [...state.data];
      console.log(cloneData);
      cloneData = payload.data;
      state.data = cloneData;
      state.newPost = payload.page;
      return { ...state };
    }
    case GET_HOT: {
      let cloneData = [...state.data];
      cloneData = [];
      state.newPost = "";
      state.data = cloneData;
      state.typePost = "hot";
      return { ...state };
    }
    case GET_NEW: {
      let cloneData = [...state.data];
      cloneData = [];
      state.newPost = "";
      state.data = cloneData;
      state.typePost = "new";
      return { ...state };
    }
    case GET_TOP: {
      let cloneData = [...state.data];
      cloneData = [];
      state.newPost = "";
      state.data = cloneData;
      state.typePost = "top";
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
