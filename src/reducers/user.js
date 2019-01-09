const initialState = {
  token: '',
  current: {},
  seasons:[],
  epiosdes:[],
  series:[]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        current: action.payload
      }
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload
      }
    case "SET_SEASONS":
      return {
        ...state,
        seasons: action.payload
      }
    case "SET_SERIES":
      return {
        ...state,
        series: action.payload
      }
    case "SET_EPISODES":
      return {
        ...state,
        episodes: action.payload
      }
    case "CLEAR_TOKEN":
      return initialState;
    default:
      return state;
  }
}