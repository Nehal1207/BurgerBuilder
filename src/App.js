import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/auth/auth';
import { connect } from 'react-redux';
import * as actions from './Store/actions/index';

class App extends Component {

    state = {
        sideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState((prevState, props) => { return ({ sideDrawer: !prevState.sideDrawer }); })
    }

    componentDidMount() {
        this.props.loginCheck();
    }
    

    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <Route path="/" component={() => <SideDrawer dispSD={this.state.sideDrawer} auth={this.props.authenticated} alterSD={this.sideDrawerHandler} />} />
                    <Route path="/" component={() => <Toolbar alterSD={this.sideDrawerHandler} auth={this.props.authenticated} />}  /> 
                    <Switch>
                        <Route path="/auth" component={Auth} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </ BrowserRouter>
            </Layout>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        authenticated: (state.auth.token) ? true : false,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginCheck: () => dispatch(actions.loginCheck())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
