import React from 'react';


export default class TodosForm extends React.Component {
    handleSubmit() {

        const node = this.refs['todo-input'];

        this.props.createTodo(node.value);

        node.value = '';
    }

    render() {

        return (
            <div id="todo-form">
                <input type="text" placeholder="type todo" ref="todo-input" />
                <input type="submit" value="OK!" onClick={ this.handleSubmit.bind(this) } />
            </div>
        );
    }
}
