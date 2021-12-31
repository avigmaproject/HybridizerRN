export const setToken = token => {
  return dispatch => {
    dispatch({type: 'SET_TOKEN', token});
  };
};

export const signout = () => {
  return dispatch => {
    dispatch({type: 'SIGN_OUT'});
  };
};

export const setLoggedIn = () => {
  return dispatch => {
    dispatch({
      type: 'SET_LOGGED',
    });
  };
};
export const setUserType = usertype => {
  console.log(usertype);
  return dispatch => {
    dispatch({
      type: 'SET_USER_TYPE',
      usertype,
    });
  };
};
