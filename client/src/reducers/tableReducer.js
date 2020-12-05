import {
  GET_ALL_TABLES,
  GET_ALL_TABLES_SUCCESS,
  GET_ALL_TABLES_FAILURE,
  DELETE_SEATING_FROM_BOOTH,
  PUT_SEATING_TO_BOOTH
} from "../actions/types";

const initialState = {
  booths: [],
  error: null,
  loaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TABLES:
      return {
        ...state,
      };
    case GET_ALL_TABLES_SUCCESS:
      return {
        booths: [...state.booths, action.payload],
        loaded: true,
      };
    case GET_ALL_TABLES_FAILURE:
      return {
        ...state,
        loaded: true,
        error: action.payload,
      };

    case PUT_SEATING_TO_BOOTH:{

      const copiedBooths = [...state.booths];
      const foundIndex = copiedBooths[0].findIndex(
        (booth) => booth.booth_id === action.payload.booth_id
      );
      if (foundIndex === -1) {
        return;
      } else {
        copiedBooths[0].splice(foundIndex, 1, action.payload);
      }

      return { ...state, booths: copiedBooths, loaded: true };
    }
    case DELETE_SEATING_FROM_BOOTH:
      const copiedBooths = [...state.booths];
      const foundIndex = copiedBooths[0].findIndex(
        (booth) => booth.booth_id === action.payload.booth_id
      );

      if (foundIndex === -1) {
        return;
      } else {
        copiedBooths[0].splice(foundIndex, 1, action.payload);
      }

      return { ...state, booths: copiedBooths, loaded: true };

    default:
      return state;
  }
}
