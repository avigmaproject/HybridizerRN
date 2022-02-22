export const initialState = {
  plant: [],
  plantdesc: [],
  plantimage: [],
  plantimagearr: [require("../../assets/plantname.png")],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLANT_INFO": {
      return {
        ...state,
        plant: action.plant,
      };
    }
    case "SET_PLANT_DESC": {
      return {
        ...state,
        plantdesc: action.plantdesc,
      };
    }
    case "SET_PLANT_IMAGE": {
      return {
        ...state,
        plantimage: action.plantimage,
      };
    }
    case "SET_PLANT_IMAGE_ARR": {
      return {
        ...state,
        plantimagearr: action.plantimagearr,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
