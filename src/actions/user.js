import api from '../api';

export function setToken(params) {
  return {
    type: "SET_TOKEN",
    payload: params
  }
}

export function setUrl(params) {
  return {
    type: "SET_URL",
    payload: params
  }
}