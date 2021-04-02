import React, { Component } from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button'

class Toolbar extends Component { 
    
    render() {
        return (
            <header className={classes.Toolbar}>
                <Button clicked={this.props.alterSD}>MENU</Button>
                <Logo />
                <nav className={classes.DisplayButtons} >
                    <NavigationItems auth={this.props.auth} />
                </nav>


            </header>
        );
    }

}

export default (Toolbar);