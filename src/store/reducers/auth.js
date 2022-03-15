export const initialState = {
  token: null,
  loggedin: false,
  link: null,
  email: null,
  cartitem: null,
  id: null,
  imageid: null,
  userid: 0,
  isvalid: false,
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
    case "SET_VALID_USER_ID": {
      return {
        ...state,
        isvalid: action.isvalid,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
