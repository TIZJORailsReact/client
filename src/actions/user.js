import api from '../api';

export function setToken(params) {
  return {
    type: "SET_TOKEN",
    payload: params
  }
}
export function setCurrentUser(params) {
  return {
    type: "SET_CURRENT_USER",
    payload: params
  }
}
export function clearToken() {
  return {
    type: "CLEAR_TOKEN",
  }
}

export function setUrl(params) {
  return {
    type: "SET_URL",
    payload: params
  }
}

export function setSeasons(params) {
  return {
    type: "SET_SEASONS",
    payload: params
  }
}

export function setSeries(params) {
  return {
    type: "SET_SERIES",
    payload: params
  }
}

export function setEpisodes(params) {
  return {
    type: "SET_SEASONS",
    payload: params
  }
}