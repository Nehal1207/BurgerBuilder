import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            {props.auth ? <React.Fragment>
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
            </React.Fragment> : null}
            <NavigationItem link="/auth">{props.auth? 'Logout' : 'Autheticate'}</NavigationItem>

            
        </ul>
    );
}

export default (navigationItems);

