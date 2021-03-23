import React, { useContext } from 'react';
import classes from './BuildControl.css';
import ControlContext from '../../../Contexts/controlContext'

const buildControl = (props) => {

	const controlContext = useContext(ControlContext);

	return (

		<div className={classes.BuildControl}>
			<div className={classes.Label}>{props.label}</div>
			<button className={classes.Less} onClick={() => controlContext.lessIngredientHandler(props.type)}>Less</button>
			<button className={classes.More} onClick={() => controlContext.moreIngredientHandler(props.type)}>More</button>
		</div>

	);

}

export default buildControl;