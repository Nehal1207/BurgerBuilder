import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button'

const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <Button clicked={props.alterSD}>MENU</Button>
            <Logo />
            <nav className={classes.DisplayButtons} >
                <NavigationItems />
            </nav>


        </header>
    );

}

export default toolbar;