import {
  GET_ALL_TABLES,
  GET_ALL_TABLES_SUCCESS,
  GET_ALL_TABLES_FAILURE,
  GET_ALL_SEATINGS,
  GET_ALL_SEATINGS_SUCCESS,
  GET_ALL_SEATINGS_FAILURE,
  UPDATE_SEATING_TO_BOOTH,
  UPDATE_SEATING_TO_BOOTH_SUCCESS,
  UPDATE_SEATING_TO_BOOTH_FAILURE,
  UPDATE_CUSTOMER_TO_BOOTH_SUCCESS,
  DELETE_SEATING,
  DELETE_SEATING_SUCCESS,
  DELETE_SEATING_FAILURE,
  DELETE_SEATING_FROM_BOOTH,
  DELETE_SEATING_FROM_CUSTOMER,
  DELETE_UNSEATED_SEATING,
  DELETE_UNSEATED_SEATING_SUCCESS,
  DELETE_UNSEATED_SEATING_FAILURE,
  PUT_SEATING_TO_BOOTH,
} from "./types";
import axios from "axios";

export const getAllTables = () => (dispatch) => {
  dispatch({
    type: GET_ALL_TABLES,
  });
  try {
    axios.get("/booths").then((res) =>
      dispatch({
        type: GET_ALL_TABLES_SUCCESS,
        payload: res.data,
      })
    );
  } catch (err) {
    dispatch({
      type: GET_ALL_TABLES_FAILURE,
      payload: err,
    });
  }
};

export const getAllSeatings = () => (dispatch) => {
  dispatch({
    type: GET_ALL_SEATINGS,
  });
  try {
    axios.get("/booths/seatings").then((seatings) =>
      dispatch({
        type: GET_ALL_SEATINGS_SUCCESS,
        payload: seatings.data,
      })
    );
  } catch (err) {
    dispatch({
      type: GET_ALL_SEATINGS_FAILURE,
      payload: err,
    });
  }
};

export const putSeatingToBooth = (patchData) => async (dispatch) => {
  dispatch({
    type: UPDATE_SEATING_TO_BOOTH,
  });
  try {
    console.log(patchData);
    axios.put("/booths/seatings", patchData).then((res) => {
      console.log(res);

      dispatch({
        type: UPDATE_CUSTOMER_TO_BOOTH_SUCCESS,
        payload: res.data.updatedSeating[0].customers,
      });
      dispatch({
        type: UPDATE_SEATING_TO_BOOTH_SUCCESS,
        payload: res.data.updatedSeating[0],
      });
      dispatch({
        type: PUT_SEATING_TO_BOOTH,
        payload: res.data.booth,
      });
    });
  } catch (err) {
    dispatch({
      type: UPDATE_SEATING_TO_BOOTH_FAILURE,
      payload: err,
    });
  }
};

export const deleteUnseatedSeating = (seating) => (dispatch) => {
  dispatch({
    type: DELETE_UNSEATED_SEATING,
  });
  try {
    axios.delete(`/booths/seatings/${seating.seatings_id}`).then((res) => {
      dispatch({
        type: DELETE_UNSEATED_SEATING_SUCCESS,
        payload: res.data.seatings_id,
      });
    });
  } catch (err) {
    dispatch({
      type: DELETE_UNSEATED_SEATING_FAILURE,
      payload: err,
    });
  }
};

export const deleteSeatingFromBooth = (modalContent) => (dispatch) => {
  dispatch({
    type: DELETE_SEATING,
  });
  try {
    axios.patch("/booths/seatings", modalContent).then((res) => {
      dispatch({
        type: DELETE_SEATING_FROM_CUSTOMER,
        payload: res.data.destroyedSeating.customers,
      });

      dispatch({
        type: DELETE_SEATING_SUCCESS,
        payload: res.data.destroyedSeating,
      });

      dispatch({
        type: DELETE_SEATING_FROM_BOOTH,
        payload: res.data.updatedBooth,
      });
    });
  } catch (err) {
    dispatch({
      type: DELETE_SEATING_FAILURE,
      payload: err,
    });
  }
};
