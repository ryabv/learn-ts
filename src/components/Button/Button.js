import React from 'react';

export default function(props) {
    function getClasses() {
        return "Button " + props.classes.join(' ');
    }

    return (
        <button onClick={props.click} className={getClasses()}><b>{props.title}</b> {props.text}</button>
    )
}