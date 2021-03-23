import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1> Hope You like Our Burger !! </h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={ props.ingredients } />
            </div>
            <Button clicked={props.canc} type="Danger">CANCEL</Button>
            <Button clicked={props.cont} type="Success">CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;