export const setToken = (token) => {
  return (dispatch) => {
    dispatch({ type: "SET_TOKEN", token });
  };
};

export const signout = () => {
  return (dispatch) => {
    dispatch({ type: "SIGN_OUT" });
  };
};

export const setLoggedIn = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOGGED",
    });
  };
};
export const setUserID = (userid) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER_ID",
      userid,
    });
  };
};
export const setValidUserID = (isvalid) => {
  return (dispatch) => {
    dispatch({
      type: "SET_VALID_USER_ID",
      isvalid,
    });
  };
};
