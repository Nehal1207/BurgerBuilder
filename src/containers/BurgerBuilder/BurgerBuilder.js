import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderList from '../../components/Burger/OrderList/OrderList';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import { Redirect } from 'react-router-dom';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        sideDrawer: false,
        placeOrder: false,
        loading: false
    }


    purchaseHandler = () => {

        this.setState((prevState, props) => {
            return ({ purchasing: !prevState.purchasing });
        })
    }


    placeOrderHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
            //search: query
        });
    }

    componentWillMount() {
        this.props.onInitIngredientHandler();
        //this.props.initPurchase();
    }


    render() {

        let orderSummary = <OrderList ingredients={this.props.ingr}
            cost={this.props.price}
            place={this.placeOrderHandler}
            clicked={this.purchaseHandler} />

        if (this.state.loading) {
            orderSummary = < Spinner />;
        }

        return (
            <React.Fragment>
                {(!this.props.token)? <Redirect to='/auth' /> : null}

                <Modal show={this.state.purchasing} clicked={this.purchasingHandler}>
                    {orderSummary}
                </Modal>

                <Burger ingredients={this.props.ingr} />

                <BuildControls
                    price={this.props.price}
                    purchasable={this.props.purchasable}
                    purchase={this.purchaseHandler}
                    addIngredient={this.props.moreIngredientHandler}
                    removeIngredient={this.props.lessIngredientHandler}
                />

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        token : state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moreIngredientHandler: (ing) => dispatch(actions.addIngredient(ing)),
        lessIngredientHandler: (ing) => dispatch(actions.removeIngredient(ing)),
        onInitIngredientHandler: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.initPurchase())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);