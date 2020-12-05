import {combineReducers} from 'redux'
import tableReducer from './tableReducer'
import customerReducer from'./customerReducer'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'
import seatingsReducer from './seatingsReducer'

export default combineReducers({
    booths: tableReducer,
    customers: customerReducer,
    menu:menuReducer,
    orders:orderReducer,
    seatings:seatingsReducer
})