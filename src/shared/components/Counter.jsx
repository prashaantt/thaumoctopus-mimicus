import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import Clicker from './Clicker';
import * as CounterActions from '../actions/CounterActions';


const mapStateToProps = (state) => {

    return { counter: state.counter };
};


class Counter extends React.Component {
    render() {

        const { counter, dispatch } = this.props;

        return (
            <div>
                <h2>Counter: { counter }</h2>
                <Clicker
                    counter={ counter }
                    type='increment'
                    { ...bindActionCreators(CounterActions, dispatch) }
                />
                <Clicker
                    counter={ counter }
                    type='decrement'
                    { ...bindActionCreators(CounterActions, dispatch) }
                />
            </div>
        );
    }
}


export default connect(mapStateToProps)(Counter);
