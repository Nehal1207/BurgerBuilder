import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders'

class App extends Component {

    state = {
        sideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState((prevState, props) => { return ({ sideDrawer: !prevState.sideDrawer }); })
    }

    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <Route path="/" component={() => <SideDrawer dispSD={this.state.sideDrawer} alterSD={this.sideDrawerHandler} />} />
                    <Route path="/" component={() => <Toolbar alterSD={this.sideDrawerHandler} />} />
                    <Switch>
                        <Route path="/orders" component={Orders} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </ BrowserRouter>
            </Layout>
        )
    }
}

export default App;
