import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from '../../Store/actions/orders';

class ContactData extends Component {

    state = {
        isFormValid : false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 20
                },
                valid : false,
                value: '',
                startChecking: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 30
                },
                valid: false,
                value: '',
                startChecking: false

            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                value: '',
                startChecking: false

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 50
                },
                valid: false,
                value: '',
                startChecking: false

            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 10
                },
                valid: false,
                value: '',
                startChecking: false

            },
            deliveryOption: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                valid: true,
                value: 'fastest'
            }

        }

    }

    componentWillMount() {
        this.setState({ ingredients: this.props.ingr })
    }

    placeOrder = (event) => {
        event.preventDefault();
        const formData = {};
        for (let i in this.state.orderForm) {
            formData[i] = this.state.orderForm[i].value;
        }
        const orderData = {
            userId : this.props.userId,
            ingredients: this.props.ingr,
            price: this.props.price,
            orderData: formData
        }
        this.props.placeOrderHandler(orderData,this.props.token);
       
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

        const updatedOrderForm = { ...this.state.orderForm };

        const updatedElement = { ...updatedOrderForm[objectIdentifier] }

        updatedElement.value = event.target.value

        updatedElement.startChecking = true;

        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);


        updatedOrderForm[objectIdentifier] = updatedElement;

        let isFormValid = true;
        
        for (let i in updatedOrderForm) {
            isFormValid = (isFormValid&&updatedOrderForm[i].valid);
        }

        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid })

    }

    render() {
        const inputArray = Object.keys(this.state.orderForm).map(k => {
            return <Input elementtype={this.state.orderForm[k].elementType}
                elementconfig={this.state.orderForm[k].elementConfig}
                value={this.state.orderForm[k].value}
                key={k}
                changed={(event) => this.changeHandler(event, k)}
                invalid={(!this.state.orderForm[k].valid) && this.state.orderForm[k].startChecking}
            />

        });

        return (
            <form className={classes.ContactData}>
                <h4> Enter Your Contact Details </h4>

                {inputArray}

                <Button type="Success" clicked={this.placeOrder} disabled={!this.state.isFormValid}>Order</Button>

            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        token: state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        placeOrderHandler: (t,token) => dispatch(orderActions.placeOrderAction(t,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);