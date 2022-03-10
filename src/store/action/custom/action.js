export const setCustomeView = (customeview) => {
  return (dispatch) => {
    dispatch({ type: "SET_CUSTOM_VIEW", customeview });
  };
};
