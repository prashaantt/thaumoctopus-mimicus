import React from 'react';


export default class TodosView extends React.Component {
    handleDelete(e) {

        const id = Number(e.target.dataset.id);

        this.props.deleteTodo(id);
    }

    handleEdit(e) {

        const id  = Number(e.target.dataset.id);
        const val = this.props.todos.get(id).text;

        const newVal = window.prompt('', val);
        this.props.editTodo(id, newVal);
    }

    render() {

        return (
            <div id="todo-list">
                {
                    this.props.todos.map((todo, index) => {

                        return (
                            <div key={ index }>
                                <span>{ todo }</span>

                                <button data-id={ index } onClick={ this.handleDelete.bind(this) }>
                                X
                                </button>
                                <button data-id={ index } onClick={ this.handleEdit.bind(this) }>
                                Edit
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
