import {
  GET_CUSTOMER_INFO,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAILURE,
  GET_ALL_CUSTOMERS,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_FAILURE,
  POST_NEW_CUSTOMER,
  POST_NEW_CUSTOMER_SUCCESS,
  POST_NEW_CUSTOMER_FAILURE,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
  GET_MENU,
  GET_MENU_FAILURE,
  GET_MENU_SUCCESS,
  REFRESH_SEATINGS,
} from "./types";
import axios from "axios";

export const getAllCustomers = () => (dispatch) => {
  dispatch({
    type: GET_ALL_CUSTOMERS,
  });
  try {
    axios.get("/customers").then((customers) => {
      dispatch({
        type: GET_ALL_CUSTOMERS_SUCCESS,
        payload: customers.data,
      });
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_CUSTOMERS_FAILURE,
      payload: err,
    });
  }
};

export const getCustomerInfo = (customer_id) => (dispatch) => {
  dispatch({
    type: GET_CUSTOMER_INFO,
  });
  try {
    axios.get(`/customers/${customer_id}`).then((customers) =>
      dispatch({
        type: GET_CUSTOMER_INFO_SUCCESS,
        payload: customers.data,
      })
    );
  } catch (err) {
    dispatch({
      type: GET_CUSTOMER_INFO_FAILURE,
      payload: err,
    });
  }
};

export const postCustomer = (tableData) => (dispatch) => {
  dispatch({
    type: POST_NEW_CUSTOMER,
  });
  try {
    axios.post("/customers", tableData).then((res) => {
      console.log(res.data);
      dispatch({
        type: POST_NEW_CUSTOMER_SUCCESS,
        payload: res.data.uploadedCustomers,
      });
      dispatch({
        type: REFRESH_SEATINGS,
        payload: res.data.uploadedSeating,
      });
    });
  } catch (err) {
    dispatch({
      type: POST_NEW_CUSTOMER_FAILURE,
      payload: err,
    });
  }
};

export const deleteCustomer = (customer_id) => (dispatch) => {
  dispatch({
    type: DELETE_CUSTOMER,
  });
  axios
    .delete(`/customers/${customer_id}`)
    .then(() => {
      dispatch({
        type: DELETE_CUSTOMER_SUCCESS,
        payload: customer_id,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};

export const getMenu = () => (dispatch) => {
  dispatch({
    type: GET_MENU,
  });
  try {
    axios.get("/menu").then((menu) =>
      dispatch({
        type: GET_MENU_SUCCESS,
        payload: menu.data,
      })
    );
  } catch (err) {
    dispatch({
      type: GET_MENU_FAILURE,
      payload: err,
    });
  }
};
