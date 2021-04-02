import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => {
    const allControls = controls.map(el => {
        return <BuildControl add={props.addIngredient} remove={props.removeIngredient} key={el.label} label={el.label} type={el.type} />;
    })

    return (
        <React.Fragment>
            <div className={classes.BuildControls}>
                <h3>Total Price  : Rs.{props.price}</h3>
                {allControls}
                <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchase} >ORDER NOW</button>
            </div>
        </React.Fragment>
    );
}

export default buildControls;