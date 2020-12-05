import {
    GET_ALL_ORDERS,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    POST_ORDER,
    POST_ORDER_FAILURE,
    POST_ORDER_SUCCESS,
    CLEAR_ORDER
} from '../actions/types.js'

const initState = {
    orders:[],
    error:null,
    loaded:false,
    orderStatus:null,
    modal_logo:null,
    modal_message:null
}


export default function(state = initState, action) {
    switch (action.type) {
        case GET_ALL_ORDERS:
            return{
                ...state,
                loaded:false
            }
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                orders:action.payload,
                loaded:true
            }
        case GET_ALL_ORDERS_FAILURE:
            return {
                ...state,
                error:action.payload,
                loaded:true
            }
        case POST_ORDER:
            return{
                ...state,
                loaded:false
            }
        case POST_ORDER_SUCCESS:
            return{
                ...state,
                orders:[...state.orders, action.payload.data],
                orderStatus:action.payload.status,
                loaded:true,
                modal_logo:action.modal_logo,
                modal_message:action.modal_message
            }
        case POST_ORDER_FAILURE:
            return{
                ...state,
                error:action.payload,
                loaded:true,
                orderStatus:action.payload.status,
                modal_logo:action.modal_logo,
                modal_message:action.modal_message
            }
        case CLEAR_ORDER:
            return {
                ...state,
                orders:[...state.orders]
            }
        default: return state
    }
}