export const initialState = {
  token: null,
  loggedin: false,
  link: null,
  email: null,
  cartitem: null,
  id: null,
  imageid: null,
  userid: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGGED": {
      return {
        ...state,
        loggedin: true,
      };
    }
    case "SIGN_OUT": {
      return {
        ...state,
        loggedin: false,
        token: null,
        userid: 0,
      };
    }
    case "SET_TOKEN": {
      return {
        ...state,
        token: action.token,
      };
    }
    case "SET_USER_ID": {
      return {
        ...state,
        userid: action.userid,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
