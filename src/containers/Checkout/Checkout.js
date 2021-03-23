import React, { Component } from 'react';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route } from 'react-router-dom';
import axios from 'axios';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        price: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = +param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ ingredients: ingredients, price: totalPrice });
    }

    cancleHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-details');
    }

    placeOrder = (event) => {
        event.preventDefault();
        axios.post('https://burgerbuilder-7c9d9-default-rtdb.firebaseio.com/orders.json', { ingredients: this.state.ingredients, price: this.state.price })
            .then(res => { console.log(res) });
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/checkout" component={() => <CheckoutSummary ingredients={this.state.ingredients} cont={this.continueHandler} canc={this.cancleHandler} />} />
                <Route path={this.props.match.path + '/contact-details'} component={() => <ContactData buy={ this.placeOrder }/>}/>
                
                
            </React.Fragment>
        );
    }
}

export default Checkout;