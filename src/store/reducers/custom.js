export const initialState = {
  customeview: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CUSTOM_VIEW": {
      return {
        ...state,
        customeview: [...state.customeview, action.customeview],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
