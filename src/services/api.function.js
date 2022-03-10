import axios from "axios";
import { API, BASE_URL } from "./api.types";

export const register = async (data) => {
  return axios(`${BASE_URL}${API.REGISTRATION_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const login = async (data) => {
  return axios(`${BASE_URL}${API.LOGIN_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const forgotpassword = async (data) => {
  return axios(API.FORGOT_PASSWORD, {
    method: "POST",
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const resetpassword = async (data) => {
  return axios(API.RESET_PASSWORD, {
    method: "POST",
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const registerstoreplantimage = async (data, access_token) => {
  return axios(API.STORE_PLANT_IMAGE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const createupdateplantmaster = async (data, access_token) => {
  return axios(API.CREATE_UPDTAE_PLANT_MASTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const createupdatesddseedling = async (data, access_token) => {
  return axios(API.CREATE_UPDATES_ADD_SEEDLING, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getplantmaster = async (data, access_token) => {
  return axios(API.GET_PLANT_MASTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const createupdateaddspouse = async (data, access_token) => {
  return axios(API.CREATE_UPDATE_ADD_SPOUSE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getaddspouse = async (data, access_token) => {
  return axios(API.GET_ADD_SPOUSE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const gethomemyplants = async (data, access_token) => {
  return axios(API.GET_HOME_MY_PLANTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getcategorymaster = async (data, access_token) => {
  return axios(API.GET_CATOGORY_MASTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getusermasterdata = async (data, access_token) => {
  //left
  return axios(API.GET_USER_MASTER_DATA, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const createupdateplantdescription = async (data, access_token) => {
  //left
  return axios(API.CREATE_UPDATE_PLANT_DESCRIPTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getplantdescription = async (data, access_token) => {
  //left
  return axios(API.GET_PLANT_DESCRIPTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
