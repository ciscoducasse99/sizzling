import {
    GET_ALL_ORDERS,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    POST_ORDER,
    POST_ORDER_FAILURE,
    POST_ORDER_SUCCESS,
    CLEAR_ORDER
} from '../actions/types.js'
import axios from 'axios'

export const getAllOrders = () => (dispatch)=>{
    dispatch({
        type:GET_ALL_ORDERS
    })
    try {
    axios.get("/orders")
    .then((res)=>{
        dispatch({
            type:GET_ALL_ORDERS_SUCCESS,
            payload:res.data
        })
    })
} catch(err){
    dispatch({
        type:GET_ALL_ORDERS_FAILURE,
        payload:err
    })
}}

export const postNewOrder = (order) => (dispatch) =>{
    console.log(order)
    dispatch({
        type:POST_ORDER
    })
    try{
        axios.post(`/orders/${order.user_id}/new-order`, order.order_ids)
        .then((res)=>{
            dispatch({
                type:POST_ORDER_SUCCESS,
                payload:res,
                modal_logo:'fa fa-check-circle text-success fa-2x',
                modal_message:'Order Successful'
            })
        })
        .then(()=>{
            setTimeout(()=>dispatch({type:CLEAR_ORDER}),3000)
        })
    } catch(err){
        dispatch({
            type:POST_ORDER_FAILURE,
            payload:err,
            modal_logo:'fa fa-times-circle text-danger fa-2x',
            modal_message:'Order failed. Please try again.'
        })
    }
}