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
        return <BuildControl key={el.label} label={el.label} type={el.type} />;
    })

    return (
        <React.Fragment>
            <div className={classes.BuildControls}>
                <p1>Total Price  : Rs.{props.price}</p1>
                {allControls}
                <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchase} >ORDER NOW</button>
            </div>
        </React.Fragment>
    );
}

export default buildControls;