import fetch from 'isomorphic-fetch';

export const subscribe = message => {
const {REACT_APP_API_URL} = process.env;
    return fetch(`${REACT_APP_API_URL}/subscribers`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};