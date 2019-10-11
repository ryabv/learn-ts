import React from 'react';

interface ButtonProps {
    title: string,
    text: string,
    classes: string[],
    click: () => void
}

export default class Button extends React.Component<ButtonProps> {
    getClasses() {
        return "Button " + this.props.classes.join(' ');
    }

    render() {
        return (
            <button 
                onClick={this.props.click} 
                className={this.getClasses()}>
                    <b>{this.props.title}</b> {this.props.text}
            </button>
        )
    }
    
}