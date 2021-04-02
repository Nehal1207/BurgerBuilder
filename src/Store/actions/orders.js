import * as actionTypes from './actionTypes';
import axios from 'axios';

export const placeOrderHelper = (id, data) => {
    return {
        type: actionTypes.PLACE_ORDER,
        id: id,
        orderData : data
    }
}

export const placeOrderAction = (data,token) => {
    return dispatch => {
        axios.post('https://burgerbuilder-7c9d9-default-rtdb.firebaseio.com/orders.json?auth=' + token, { ingredients: data.ingredients, price: data.price, orderData: data.orderData,userId: data.userId })
            .then(res => { console.log(res.data);dispatch(placeOrderHelper (res.data.name , data)) });

    }
    
}

export const setOrders = (orders) => {
    return {
        type: actionTypes.SET_ORDERS,
        orders: orders
    }
}

export const fetchOrders = (token ,userId) => {
    return dispatch => {
        axios.get('https://burgerbuilder-7c9d9-default-rtdb.firebaseio.com/orders.json?auth='+ token).then(res => {
            const orders = []
            for (let i in res.data) {
                if(res.data[i].userId === userId)orders.push({ id: i, dat: res.data[i] });
            }
            dispatch(setOrders(orders));
  
        })

    }
    
}

export const initPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const orderError = () => {
    return {
        type: actionTypes.ORDER_ERROR
    }
}