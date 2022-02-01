export const setPlantInfo = (plant) => {
  return (dispatch) => {
    dispatch({ type: "SET_PLANT_INFO", plant });
  };
};
export const setPlantDesc = (plantdesc) => {
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
