export const createTodo = (text) => {

    return {
        type: 'CREATE_TODO',
        text,
        date: Date.now()
    };
};


export const editTodo = (id, text) => {

    return {
        type: 'EDIT_TODO',
        id,
        text,
        date: Date.now()
    };
};


export const deleteTodo = (id) => {

    return {
        type: 'DELETE_TODO',
        id
    };
};
