import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement = null;

    const elementClass = [classes.InputElement];

    if (props.invalid) {
        elementClass.push(classes.Invalid);
    }

    switch (props.elementtype) {
        case "input":
            inputElement = <input className={elementClass.join(' ')} {...props.elementconfig} value={props.val} onChange={props.changed} />;
            break;
        case "textarea":
            inputElement = <textarea {...props.elementconfig} value={props.val} onChange={props.changed} />;
            break;
        case "select":
            inputElement = (<select className={elementClass.join(' ')} value={props.val} onChange={props.changed}>
                {props.elementconfig.options
                    .map(op => {
                        return <option key={op.value} value={op.value}>{op.displayValue}</option>
                    })}
            </select>)
            break;
        default:
            inputElement = <input className={elementClass.join(' ')} {...props.elementconfig} value={props.val} onChange={props.changed} />;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;