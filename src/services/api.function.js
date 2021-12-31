import axios from 'axios';
import {API, BASE_URL} from './api.types';

export const register = async data => {
  return axios(`${BASE_URL}${API.REGISTRATION_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const login = async data => {
  return axios(`${BASE_URL}${API.LOGIN_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
