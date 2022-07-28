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
  threadData: {}, //thread detail data
  data: [],     //Post list data
  typePost: "",// type of post to get new, hot, top post list
  newPost: "", // last post id to get new post list
};
export const subReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POST: {
      let cloneData = [...state.data];
      let cloneThreadData = { ...state.threadData };
      cloneData = payload.data;
      // check thread data existed 
      let index = cloneData.findIndex((post) => {
        return post.id === cloneThreadData.id;
      });
      if (index !== -1) {
        //  Thread data existed
        // Assign thread data to post list data
        cloneData[index] = { ...cloneThreadData };
      } else {
        // Thread data empty
        // Assign post list data to thread data
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
      // check thread data existed 
      let index = cloneData.findIndex((post) => {
        return post.id === payload.data.id;
      });
      if (index !== -1) {
        // Thread data existed
        // Assign thread data to post list data
        cloneThreadData = { ...cloneData[index] };
      } else {
        // Thread data empty
        // Assign post list data to thread data
        cloneThreadData = payload.data;
      }
      state.threadData = cloneThreadData;
      return { ...state };
    }
    case GET_HOT: {
      let cloneData = [...state.data];
      // Clear post list data and last post id
      cloneData = [];
      state.newPost = "";
      state.data = cloneData;
      // Send type to render hot post list
      state.typePost = "hot";
      return { ...state };
    }
    case GET_NEW: {
      let cloneData = [...state.data];
      // Clear post list data and last post id
      cloneData = [];
      state.newPost = "";
      state.data = cloneData;
       // Send type to render new post list
      state.typePost = "new";
      return { ...state };
    }
    case GET_TOP: {
      let cloneData = [...state.data];
      cloneData = [];
      state.newPost = "";
      state.data = cloneData;
      // Send type to render top post list
      state.typePost = "top";
      return { ...state };
    }

    case UP_VOTE: {
      let cloneData = [...state.data];
      let cloneThreadData = { ...state.threadData };
      // Get post id
      let index = cloneData.findIndex((post) => {
        return post.id === payload.postId;
      });
      if (index !==-1)
      {
          // Check lastScore value of post is existed
          if (!cloneData[index].lastScore) {
            // Add lastScore value to data for calculating new vote score
            // lastScore ==== current vote
            cloneData[index] = {
              ...cloneData[index],
              lastScore: cloneData[index].score,
            };
            // vote + 1
            cloneData[index].score += 1;
          } else {
            // User clicked downvote before clicked upvote
            if (cloneData[index].score - cloneData[index].lastScore < 0) {
              // vote + 2
              cloneData[index].score += 2;
            }
          }
          cloneThreadData.score = cloneData[index].score;
      }
      else 
      {
        // Check lastScore value of post is existed
        if (!cloneThreadData.lastScore) {
          // Add lastScore value to data for calculating new vote score
          // lastScore ==== current vote
          cloneThreadData = {
            ...cloneThreadData,
            lastScore: cloneThreadData.score,
          };
          // vote + 1
          cloneThreadData.score += 1;
        } else {
          // User clicked downvote before clicked upvote
          if (cloneThreadData.score - cloneThreadData.lastScore < 0) {
            // vote + 2
            cloneThreadData.score += 2;
          }
        }
      }
      state.threadData = cloneThreadData;
      state.data = cloneData;
      return { ...state };
    }

    case DOWN_VOTE: {
      let cloneData = [...state.data];
      let cloneThreadData = { ...state.threadData };
      // Get post id
      let index = cloneData.findIndex((post) => {
        return post.id === payload.postId;
      });
      if (index !==-1)
      {
      // Check lastScore value of post is existed
      if (!cloneData[index].lastScore) {
        // Add lastScore value to data for calculating new vote score
        // lastScore ==== current vote
        cloneData[index] = {
          ...cloneData[index],
          lastScore: cloneData[index].score,
        };
        // vote - 1 
        cloneData[index].score -= 1;
      } else {
        // User clicked upvote before clicked downvote
        if (cloneData[index].score - cloneData[index].lastScore > 0) {
          //vote - 2
          cloneData[index].score -= 2;
        }
      }
      cloneThreadData.score = cloneData[index].score;
    }
      else
      {
        // Check lastScore value of post is existed
        if (!cloneThreadData.lastScore) {
          // Add lastScore value to data for calculating new vote score
          // lastScore ==== current vote
          cloneThreadData = {
            ...cloneThreadData,
            lastScore: cloneThreadData.score,
          };
          // vote - 1
          cloneThreadData.score -= 1;
        } else {
           // User clicked upvote before clicked downvote
          if (cloneThreadData.score - cloneThreadData.lastScore > 0) {
            // vote - 2
            cloneThreadData.score -= 2;
          }
        }
      }
      state.threadData = cloneThreadData;
      state.data = cloneData;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};
