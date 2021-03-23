import React from 'react';
import Button from '../../UI/Button/Button';

const orderList = (props) => {

    const ingr = { ...props.ingredients }

    const list = Object.keys(ingr).map(igKey => {
        return <li key={igKey}>{igKey} : {ingr[igKey]}</li>
    })

    return (
        <React.Fragment>
            <h3>Order List</h3>
            <p>Delicious Burger with Following Ingredients !!</p>
            <ul>
                {list}
            </ul>
            <h2>Total Price : Rs. {props.cost}</h2>
            <Button clicked={props.clicked} type="Danger">CANCEL</Button>
            <Button clicked={props.place} type="Success">CONTINUE</Button>
        </React.Fragment>
    );

}

export default orderList;