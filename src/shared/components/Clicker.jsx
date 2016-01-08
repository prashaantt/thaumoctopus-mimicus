import React from 'react';


export default class Clicker extends React.Component {
    handleClick() {

        if (this.props.type === 'increment') {
            this.props.incrementCounter(this.props.counter);
        }
        else {
            this.props.decrementCounter();
        }
    }


    render() {

        return (
            <button onClick={ this.handleClick.bind(this) }>{ this.props.type }</button>
        );
    }
}
