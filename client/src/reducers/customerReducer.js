import {
  GET_CUSTOMER_INFO,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAILURE,
  GET_ALL_CUSTOMERS,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_FAILURE,
  POST_NEW_CUSTOMER,
  POST_NEW_CUSTOMER_FAILURE,
  POST_NEW_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_TO_BOOTH,
  UPDATE_CUSTOMER_TO_BOOTH_SUCCESS,
  UPDATE_CUSTOMER_TO_BOOTH_FAILURE,
  DELETE_SEATING_FROM_CUSTOMER
} from "../actions/types";

const initalState = {
  customers: [],
  user: null,
  error: null,
  loaded: false,
  console: null,
};

// I can filter through active customers

// LOOK AT ASYNC AND SYNC ACTIONS

export default function (state = initalState, action) {
  switch (action.type) {
    // GET ALL CUSTOMERS
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        loaded: false,
      };
    case GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        loaded: true,
      };
    case GET_ALL_CUSTOMERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loaded: true,
      };
    // GET SINGLE CUSTOMER INFO
    case GET_CUSTOMER_INFO:
      return {
        ...state,
        loaded: false,
      };
    case GET_CUSTOMER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loaded: true,
      };
    case GET_CUSTOMER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
        loaded: true,
      };
    case POST_NEW_CUSTOMER:
      return {
        ...state,
        loaded: false,
      };
    case POST_NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, ...action.payload],
        loaded: true,
      };
    case POST_NEW_CUSTOMER_FAILURE:
      return {
        ...state,
        loaded: true,
        error: action.payload,
      };
    case UPDATE_CUSTOMER_TO_BOOTH:
      return {
        ...state,
        loaded: false,
      };
    case UPDATE_CUSTOMER_TO_BOOTH_SUCCESS:
      let oldCustomers = [...state.customers];
      let updatedCustomers = action.payload;

      // Get all Ids in array, then remove customers from state
      let updatedIds = [];
      updatedCustomers.forEach((customer) =>
        updatedIds.push(customer.customer_id)
      );
      const customers = oldCustomers.filter((customer) => {
        return updatedIds.indexOf(customer.customer_id) === -1;
      });

      // new state of filtered customers and updated customers
      const newCustomers = [...customers, ...updatedCustomers];
      return {
        ...state,
        loaded: true,
        customers: newCustomers
      };
    case UPDATE_CUSTOMER_TO_BOOTH_FAILURE:
      return {
        ...state,
        loaded: true,
        error: action.payload,
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        loaded: false,
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.customer_id !== action.payload
        ),
        loaded: true,
      };
    case DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        loaded: true,
        error: action.payload,
      };
    case DELETE_SEATING_FROM_CUSTOMER:

      const copiedCustomers = [...state.customers];
      const payloadIds = action.payload.map(customer => customer.customer_id)

       const filteredCustomers = copiedCustomers.filter(customer =>
        !payloadIds.includes(customer.customer_id)
       )

      
      return{
        ...state,
        customers:filteredCustomers
      }
    default:
      return state;
  }
}
