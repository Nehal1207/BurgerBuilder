import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import classes from './auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        isFromValid: false,
        control: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                value: '',
                startChecking: false

            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 10
                },
                displayValue : '1',
                valid: false,
                value: '',
                startChecking: false

            },
        },
        signIn: false
    }

    checkValidity = (ke, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = !(ke.trim() === '') && isValid;
        }

        if (rules.minLength) {
            isValid = !(ke.trim().length < rules.minLength) && isValid;
        }

        if (rules.maxLength) {
            isValid = !(ke.trim().length > rules.maxLength) && isValid;
        }

        return isValid;
    }


    changeHandler = (event, objectIdentifier) => {

        const updatedcontrol = { ...this.state.control };

        const updatedElement = { ...updatedcontrol[objectIdentifier] }

        updatedElement.value = event.target.value

        updatedElement.startChecking = true;

        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);

        updatedcontrol[objectIdentifier] = updatedElement;

        let isFormValid = true;

        for (let i in updatedcontrol) {
            isFormValid = (isFormValid && updatedcontrol[i].valid);
        }
        //console.log()
        this.setState({ control: updatedcontrol, isFormValid: isFormValid })

    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.control.email.value, this.state.control.password.value, this.state.signIn);
    }

    switchButtonHandler = () => {
        this.setState({ signIn: !this.state.signIn });
    }

    logoutHandler = () => {
        this.props.logout();
    }


    render() {
        
        const inputArray = Object.keys(this.state.control).map(k => {
            return <Input elementtype={this.state.control[k].elementType}
                elementconfig={this.state.control[k].elementConfig}
                value={this.state.control[k].value}
                key={k}
                changed={(event) => this.changeHandler(event, k)}
                invalid={(!this.state.control[k].valid) && this.state.control[k].startChecking}
            />

        });

        const display = (!this.props.loading) ? (<div className={classes.authData}>
            {this.props.error ? <h4>Invalid Credentials</h4> : null}
            <form onSubmit={(event) => this.submitHandler(event)}>
                {inputArray}
                <Button type="Success" disabled={!this.state.isFormValid}>{this.state.signIn ? 'Sign In' : 'Sign Up'}</Button>
            </form>
            <Button type="Danger" clicked={this.switchButtonHandler}>Switch To {this.state.signIn ? 'Sign Up' : 'Sign In'}</Button>
        </div>) : <Spinner />;

        const logout = (<div style={{ textAlign: 'center' }}>
            <Button type="Danger" clicked={this.logoutHandler} >Log Out</Button>
        </div>
        );

        return (
            <React.Fragment>
                
                {this.props.jump ? <Redirect to="/" /> : null}
                {this.props.authenticated ? logout : display}
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        jump: state.auth.authenticated,
        authenticated: (state.auth.token) ? true : false,
        error : state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, signIn) => dispatch(actions.authHandler(email, password, signIn)),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);