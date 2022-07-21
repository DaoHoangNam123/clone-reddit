let initialState = {
  trailerID: "",
  isOpen: false,
};

export const threadReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default: {
      return { ...state };
    }
  }
};
