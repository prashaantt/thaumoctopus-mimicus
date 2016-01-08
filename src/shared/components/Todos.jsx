import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { TodosForm, TodosView } from '.';
import * as TodoActions from '../actions/TodoActions';


const mapStateToProps = (state) => {

    return { todos: state.todos };
};


class Todos extends React.Component {
    render() {

        const { todos, dispatch } = this.props;

        return (
            <div id="todo-list">
                <TodosView
                    todos={ todos }
                    { ...bindActionCreators(TodoActions, dispatch) }
                />
                <TodosForm
                    { ...bindActionCreators(TodoActions, dispatch) }
                />
            </div>
        );
    }
};


// @connect((state) => ({ todos: state.todos }))
export default connect(mapStateToProps)(Todos);
