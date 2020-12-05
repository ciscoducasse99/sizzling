import {
    GET_ALL_SEATINGS,
    GET_ALL_SEATINGS_SUCCESS,
    GET_ALL_SEATINGS_FAILURE,
    UPDATE_SEATING_TO_BOOTH,
    UPDATE_SEATING_TO_BOOTH_SUCCESS,
    UPDATE_SEATING_TO_BOOTH_FAILURE,
    DELETE_SEATING,
    DELETE_SEATING_SUCCESS,
    DELETE_SEATING_FAILURE,
    DELETE_UNSEATED_SEATING,
    DELETE_UNSEATED_SEATING_SUCCESS,
    DELETE_UNSEATED_SEATING_FAILURE,
    REFRESH_SEATINGS
  } from "../actions/types";

  const initialState = {
    seatings:[],
    seatings_error:null,
    seatings_loaded:false,
    console:null
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {  
      case GET_ALL_SEATINGS:
        return {
          ...state,
          seatings_loaded:false
        }
      case GET_ALL_SEATINGS_SUCCESS:
        return{
          seatings:action.payload,
          seatings_loaded:true,
        }
      case GET_ALL_SEATINGS_FAILURE:
        return{
          ...state,
          seatings_loaded:true,
          seatings_error:action.payload
        }
        case UPDATE_SEATING_TO_BOOTH:
      return{
        ...state,
        loaded:false
      }
    case UPDATE_SEATING_TO_BOOTH_SUCCESS:
      return{
        ...state,
        loaded:true,
        seatings:state.seatings.map(seating => (seating.seatings_id === action.payload.seatings_id) ? action.payload : seating)
      }
    case UPDATE_SEATING_TO_BOOTH_FAILURE:
      return{
        ...state,
        loaded:true,
        error:action.payload
      }
      case DELETE_UNSEATED_SEATING:
      return{
        ...state,
        loaded:false
      }
      case DELETE_UNSEATED_SEATING_SUCCESS:
      return{
        ...state,
        seatings:state.seatings.filter(seating => seating.seatings_id !== action.payload),
        loaded:true
      }
      case DELETE_UNSEATED_SEATING_FAILURE:
      return{
        ...state,
        loaded:false,
        error:action.payload
      }


    case DELETE_SEATING:
      return{
        ...state,
        loaded:false
      }
      case DELETE_SEATING_SUCCESS:
      return{
        ...state,
        seatings:[...state.seatings.filter(seating => seating.seatings_id !== action.payload.seatings_id)],
        loaded:true
      }
      case DELETE_SEATING_FAILURE:
      return{
        ...state,
        loaded:false,
        error:action.payload
      }

      case REFRESH_SEATINGS:
        return{
          ...state,
          seatings:[...state.seatings, action.payload]
        }
      default:
        return state;
    }
  }
  