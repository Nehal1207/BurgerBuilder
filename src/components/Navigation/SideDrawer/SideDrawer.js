import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    const cls = [classes.SideDrawer];

    if (props.dispSD) cls.push(classes.Open);
    else cls.push(classes.Close);

    return (
        <React.Fragment>
            <BackDrop show={props.dispSD} clicked={ props.alterSD }/>
            <div className={cls.join(' ')} onClick={props.alterSD} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems auth={ props.auth }/>
            </div>
        </React.Fragment>

    );
}

export default sideDrawer;