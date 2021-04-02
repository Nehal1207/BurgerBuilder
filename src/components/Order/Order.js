import React from 'react';
import classes from './Order.css';

const order = props => {
    const ingredients = Object.keys(props.data.ingredients).map(igKey => (
        (<p key={igKey}>{igKey} ({props.data.ingredients[igKey]}) </p>)
        ));
return (
    <div className={classes.Order} >
        <p>Ingredients : </p>
        {ingredients}
        <p>Price : <strong> {props.data.price} </strong></p>
    </div>
);
}

export default order;