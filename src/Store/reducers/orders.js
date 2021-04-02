import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    purchased: false,
    Errors : false
}

const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.ORDER_ERROR) {
        return {
            Errors : true
        }
    }

    if (action.type === actionTypes.PURCHASE_INIT) {
        return {
            ...state,
            purchased: false,
            Errors: false
        }
    }

    if (action.type === actionTypes.PLACE_ORDER) {

        const newOrders = state.orders.concat({ id : action.id ,dat : action.orderData });

        return { ...state, orders: newOrders, purchased: true, Errors: false};
    }

    if (action.type === actionTypes.SET_ORDERS) {

        return { ...state, orders: action.orders , Errors : false }
    }

    return state;


}

export default reducer;