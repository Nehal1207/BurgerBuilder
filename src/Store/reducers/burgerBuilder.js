import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
    salad: 15,
    bacon: 35,
    cheese: 20,
    meat: 40
}

const initialState = {
    //ingredients: {},
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 30,
    purchasable: false,
}

const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.ADD_INGREDIENT) {
        const prevIngredients = state.ingredients;
        const newCount = prevIngredients[action.ingrType] + 1;
        const newIngredients = { ...prevIngredients };
        newIngredients[action.ingrType] = newCount;
        const newTotalPrice = state.totalPrice + INGREDIENT_PRICE[action.ingrType];
        return { ingredients: newIngredients, totalPrice: newTotalPrice, purchasable: true }
    }

    if (action.type === actionTypes.REMOVE_INGREDIENT) {
        const prevIngredients = state.ingredients;
        let newTotalPrice = state.totalPrice - INGREDIENT_PRICE[action.ingrType];

        if (prevIngredients[action.ingrType] === 0) {
            prevIngredients[action.ingrType] = 1;
            newTotalPrice += INGREDIENT_PRICE[action.ingrType];
        }
        const newCount = (prevIngredients[action.ingrType] - 1) > 0 ? (prevIngredients[action.ingrType] - 1) : 0;
        const newIngredients = { ...prevIngredients };
        newIngredients[action.ingrType] = newCount;

        let purchase = true;

        const sum = Object.keys(newIngredients).map(igKey => {
            return newIngredients[igKey];
        }).reduce((arr, el) => { return arr + el; }, 0);

        if (sum === 0) purchase = false;

        return { ingredients: newIngredients, totalPrice: newTotalPrice, purchasable: purchase }

    }

    if (action.type === actionTypes.SET_INGREDIENTS) {
        return {
            ...state,
            ingredients: {
                salad: action.ingred['salad'],
                bacon: action.ingred['bacon'],
                cheese: action.ingred['cheese'],
                meat: action.ingred['meat']
            },
            totalPrice : 30
        }
    }


    return state;
}

export default reducer;