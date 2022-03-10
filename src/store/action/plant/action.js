export const setPlantInfo = (plant) => {
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_INFO", plant });
  };
};
export const setPlantDesc = (plantdesc) => {
  console.log("plantdescplantdesc", plantdesc);
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_DESC", plantdesc });
  };
};
export const setPlantImage = (plantimage) => {
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_IMAGE", plantimage });
  };
};
export const setPlantImageArr = (plantimagearr) => {
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_IMAGE_ARR", plantimagearr });
  };
};
export const setPlantId = (plantid) => {
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_ID", plantid });
  };
};
export const setSpouseId = (spouseid) => {
  return (dispatch) => {
    dispatch({ type: "SET_SPOUSE_PLANT_ID", spouseid });
  };
};
export const setChlidId = (chlidid) => {
  return (dispatch) => {
    dispatch({ type: "SET_CHLID_PLANT_ID", chlidid });
  };
};
export const setPlantTitle = (planttitle) => {
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_TITLE", planttitle });
  };
};
export const logoutAccount = () => {
  return (dispatch) => {
    dispatch({ type: "DELETE_PLANT_DETAIL" });
  };
};
