const defaultState = 0;


export default (state = defaultState, action) => {

    switch (action.type) {
        case 'SET_COUNTER':
            return action.counter;
        case 'INCREMENT_COUNTER':
            return state + 1;
        case 'DECREMENT_COUNTER':
            return state - 1;
        default:
            return state;
    }
};
