import { GET_MENU, GET_MENU_SUCCESS, GET_MENU_FAILURE } from "../actions/types";

const initialState = {
  menu: [],
  error:null,
  loaded:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        loaded:false
      };
    case GET_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload.sort(),
        loaded:true
      };
    case GET_MENU_FAILURE:
      return {
        ...state,
        error:action.payload,
        loaded:true
      };
    default:
      return state;
  }
}
