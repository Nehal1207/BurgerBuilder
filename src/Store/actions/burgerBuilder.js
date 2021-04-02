import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = (ingredientType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingrType: ingredientType
    }
}

export const removeIngredient = (ingredientType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingrType: ingredientType
    }
}

export const setIngredient = (ingr) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingred : ingr,
    }
}

export const initIngredients = () => {

    return dispatch => {
        axios.get('https://burgerbuilder-7c9d9-default-rtdb.firebaseio.com/ingredients.json')
            .then(ingre => {
                dispatch(setIngredient(ingre.data.ingredients));
            })
            .catch(err => {
                console.log(err)
            })
    }

}