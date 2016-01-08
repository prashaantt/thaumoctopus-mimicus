import fetch from 'isomorphic-fetch';


const API_URL = 'http://localhost:4000/api/counter';


// export const requestCounter = () => {

//     return {
//         type: 'REQ_COUNTER'
//     };
// };


export const fetchCounter = () => {

    return (dispatch) => {

        // dispatch(requestCounter());

        return fetch(API_URL)
            .then((response) => response.json())
            .then((json) => dispatch(setCounter(json.counter)))
            .catch((err) => console.error(err));
    };
};


export const setCounter = (counter) => {

    return {
        type: 'SET_COUNTER',
        counter,
        receivedAt: Date.now()
    };
};


export const incrementCounter = (counter) => {

    return {
        type: 'INCREMENT_COUNTER',
        promise: fetch(`${API_URL}/increment`)
    };
};


export const decrementCounter = () => {

    return {
        type: 'DECREMENT_COUNTER',
        promise: fetch(`${API_URL}/decrement`)
    };
};
