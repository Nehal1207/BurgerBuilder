import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import ControlContext from '../../Contexts/controlContext';
import Modal from '../../components/UI/Modal/Modal';
import OrderList from '../../components/Burger/OrderList/OrderList';
import axiosInstance from '../../axiosInstance';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICE = {
    salad: 15,
    bacon: 35,
    cheese: 20,
    meat: 40
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0

        },
        totalPrice: 30,
        purchasable: false,
        purchasing: false,
        sideDrawer: false,
        placeOrder: false,
        loading: false
    }


    moreIngredientHandler = (type) => {

        this.setState((prevState, props) => {
            const prevIngredients = prevState.ingredients;
            const newCount = prevIngredients[type] + 1;
            const newIngredients = { ...prevIngredients };
            newIngredients[type] = newCount;
            const newTotalPrice = prevState.totalPrice + INGREDIENT_PRICE[type];
            return { ingredients: newIngredients, totalPrice: newTotalPrice, purchasable: true }
        })



    }

    lessIngredientHandler = (type) => {

        this.setState((prevState, props) => {
            const prevIngredients = prevState.ingredients;
            let newTotalPrice = prevState.totalPrice - INGREDIENT_PRICE[type];

            if (prevIngredients[type] === 0) {
                prevIngredients[type] = 1;
                newTotalPrice += INGREDIENT_PRICE[type];
            }
            const newCount = (prevIngredients[type] - 1) > 0 ? (prevIngredients[type] - 1) : 0;
            const newIngredients = { ...prevIngredients };
            newIngredients[type] = newCount;

            let purchase = true;

            const sum = Object.keys(newIngredients).map(igKey => {
                return newIngredients[igKey];
            }).reduce((arr, el) => { return arr + el; }, 0);

            if (sum === 0) purchase = false;

            return { ingredients: newIngredients, totalPrice: newTotalPrice, purchasable: purchase }
        })

    }


    purchaseHandler = () => {

        this.setState((prevState, props) => {
            return ({ purchasing: !prevState.purchasing });
        })
    }


    placeOrderHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice));
        const query = '?' + queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search : query
        });
    }

    //componentDidUpdate() {
    //    if (this.state.placeOrder) {
    //        this.setState({ loading: true });
    //        const order = {
    //            ingredients: this.state.ingredients,
    //            price: this.state.price
    //        }
    //        axiosInstance.post('/orders.json', this.state.ingredients).then(response => {
    //            this.setState({ purchasing : false ,loading: false });
    //        })
    //        this.setState({ placeOrder: false })
    //    }
    //}


    render() {

        let orderSummary = <OrderList ingredients={this.state.ingredients}
            cost={this.state.totalPrice}
            place={this.placeOrderHandler}
            clicked={this.purchaseHandler} />

        if (this.state.loading) {
            orderSummary = < Spinner />;
        }

        return (
            <React.Fragment>

                <Modal show={this.state.purchasing} clicked={this.purchasingHandler}>
                    {orderSummary}
                </Modal>

                <Burger ingredients={this.state.ingredients} />
                <ControlContext.Provider value={{ lessIngredientHandler: this.lessIngredientHandler, moreIngredientHandler: this.moreIngredientHandler }}>
                    <BuildControls price={this.state.totalPrice} purchasable={this.state.purchasable} purchase={this.purchaseHandler} />
                </ControlContext.Provider>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;