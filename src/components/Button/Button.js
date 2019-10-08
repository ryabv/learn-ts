import React from 'react';

export default class Button extends React.Component {
    componentDidMount() {
        return (<button onClick={this.props.click} className={this.getClasses()}><b>{this.props.title}</b> {this.props.text}</button>)
    }

    getClasses() {
        return "Button " + this.props.classes.join(' ');
    }

    render() {
        return (
            <button onClick={this.props.click} className={this.getClasses()}><b>{this.props.title}</b> {this.props.text}</button>
        )
    }
    
}