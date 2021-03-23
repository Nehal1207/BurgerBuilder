import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4> Enter Your Contact Details </h4>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Your street" />
                <input type="text" name="postalCode" placeholder="Your Postal Code" />
                <Button type="Success" clicked={this.props.buy}>CONTINUE</Button>

            </div>
        );
    }
}

export default ContactData;