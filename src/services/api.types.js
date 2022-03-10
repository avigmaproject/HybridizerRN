export const BASE_URL = "http://ihybrid.ikaart.org";

export const API = {
  REGISTRATION_API: "/token",
  LOGIN_API: "/token",
  STORE_PLANT_IMAGE_API: BASE_URL + "/api/Hybrid/UploadImages",
  CREATE_UPDTAE_PLANT_MASTER: BASE_URL + "/api/Hybrid/CreateUpdatePlantMaster",
  FORGOT_PASSWORD: BASE_URL + "/api/Hybrid/ForGotPassword",
  RESET_PASSWORD: BASE_URL + "/api/Hybrid/ChangePasswordByEmail",
  CREATE_UPDATES_ADD_SEEDLING: BASE_URL + "/api/Hybrid/CreateUpdateAddSeedling",
  GET_PLANT_MASTER: BASE_URL + "/api/Hybrid/GetPlantMaster",
  CREATE_UPDATE_ADD_SPOUSE: BASE_URL + "/api/Hybrid/CreateUpdateAddSpouse",
  GET_USER_MASTER_DATA: BASE_URL + "/api/Hybrid/GetUserMasterData",
  GET_ADD_SPOUSE: BASE_URL + "/api/Hybrid/GetAddSpouse",
  CREATE_UPDATE_PLANT_DESCRIPTION:
    BASE_URL + "/api/Hybrid/CreateUpdatePlantDescription",
  GET_PLANT_DESCRIPTION: BASE_URL + "/api/Hybrid/GetPlantDescription",
  GET_HOME_MY_PLANTS: BASE_URL + "/api/Hybrid/GetHomeMyPlants",
  GET_CATOGORY_MASTER: BASE_URL + "/api/Hybrid/GetCategoryMaster",
};
