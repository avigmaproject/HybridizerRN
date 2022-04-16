export const initialState = {
  plant: { categoryname1: "", plantname1: "" },
  plantdesc: [],
  plantimage: [],
  plantimagearr: [require("../../assets/plantname.png")],
  plantid: 0,
  spouseid: 0,
  planttitle: "My Plants",
  chlidid: 0,
  copyplant: false,
  plantname: "",
  plantcategory: "",
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
    case "SET_PLANT_ID": {
      return {
        ...state,
        plantid: action.plantid,
      };
    }
    case "SET_SPOUSE_PLANT_ID": {
      return {
        ...state,
        spouseid: action.spouseid,
      };
    }
    case "SET_CHLID_PLANT_ID": {
      return {
        ...state,
        chlidid: action.chlidid,
      };
    }
    case "SET_PLANT_TITLE": {
      return {
        ...state,
        planttitle: action.planttitle,
      };
    }
    case "SET_PLANT_NAME": {
      return {
        ...state,
        plantname: action.plantname,
      };
    }
    case "SET_PLANT_CATEGORY": {
      return {
        ...state,
        plantcategory: action.plantcategory,
      };
    }
    case "SET_COPY_PLANT": {
      return {
        ...state,
        copyplant: action.copyplant,
      };
    }

    case "DELETE_PLANT_DETAIL": {
      return {
        ...state,
        plant: { categoryname1: "", plantname1: "" },
        plantdesc: [],
        plantimage: [],
        plantimagearr: [require("../../assets/plantname.png")],
        plantid: 0,
        spouseid: 0,
        chlidid: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
