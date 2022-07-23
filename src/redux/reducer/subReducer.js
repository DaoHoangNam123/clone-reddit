import {
  DOWN_VOTE,
  GET_HOT,
  GET_NEW,
  GET_POST,
  GET_THREAD,
  GET_TOP,
  UP_VOTE,
} from "../constants/RedditConstant";

let initialState = {
  threadData: {},
  data: [],
  typePost: "",
  newPost: "",
};
export const subReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POST: {
      let cloneData = [...state.data];
      let cloneThreadData = { ...state.threadData };
      cloneData = payload.data;
      let index = cloneData.findIndex((post) => {
        return post.id === cloneThreadData.id;
      });
      if (index !== -1) {
        cloneData[index] = { ...cloneThreadData };
      } else {
        cloneThreadData = { ...cloneData[index] };
      }
      state.threadData = cloneThreadData;
      state.data = cloneData;
      state.newPost = payload.page;
      return { ...state };
    }
    case GET_THREAD: {
      let cloneData = [...state.data];
      let cloneThreadData = { ...state.threadData };
      let index = cloneData.findIndex((post) => {
        return post.id === payload.data.id;
      });
      if (index !== -1) {
        cloneThreadData = { ...cloneData[index] };
      } else {
        cloneThreadData = payload.data;
      }
      state.threadData = cloneThreadData;
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

    case UP_VOTE: {
      let cloneData = [...state.data];
      let cloneThreadData = { ...state.threadData };
      let index = cloneData.findIndex((post) => {
        return post.id === payload.postId;
      });
      if (!cloneData[index].lastScore) {
        cloneData[index] = {
          ...cloneData[index],
          lastScore: cloneData[index].score,
        };
        console.log(cloneData[index]);
        cloneData[index].score += 1;
      } else {
        if (cloneData[index].score - cloneData[index].lastScore < 0) {
          cloneData[index].score += 2;
        }
      }
      cloneThreadData.score = cloneData[index].score;
      state.threadData = cloneThreadData;
      state.data = cloneData;
      return { ...state };
    }

    case DOWN_VOTE: {
      let cloneData = [...state.data];
      let cloneThreadData = { ...state.threadData };
      let index = cloneData.findIndex((post) => {
        return post.id === payload.postId;
      });
      if (!cloneData[index].lastScore) {
        cloneData[index] = {
          ...cloneData[index],
          lastScore: cloneData[index].score,
        };
        cloneData[index].score -= 1;
      } else {
        if (cloneData[index].score - cloneData[index].lastScore > 0) {
          cloneData[index].score -= 2;
        }
      }
      cloneThreadData.score = cloneData[index].score;
      state.threadData = cloneThreadData;
      state.data = cloneData;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};
