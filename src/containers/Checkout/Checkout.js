import React, { Component } from 'react';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {


    cancleHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-details');
    }



    render() {
        console.log('rendering');
        const redi = this.props.purch ? <Redirect to='/' /> : null;
        
        const temp = { salad: 0, bacon: 0, cheese: 0, meat: 0 };

        const summary = (JSON.stringify(this.props.ingr) !== JSON.stringify(temp)) ? (
            <React.Fragment>
                {redi}
                <Route path="/checkout" component={() => <CheckoutSummary ingredients={this.props.ingr} cont={this.continueHandler} canc={this.cancleHandler} />} />
                <Route path={this.props.match.path + '/contact-details'} component={ContactData} />
            </React.Fragment>
        ) : <Redirect to='/' />;
        return (
            <React.Fragment>
                
                {summary}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purch: state.orders.purchased
    }
}

export default connect(mapStateToProps)(Checkout);