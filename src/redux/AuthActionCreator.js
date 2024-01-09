import * as actionTypes from './actionTypes';
import axios from 'axios';

export const auth = (email, password) => dispatch => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }
    const API_KEY = "AIzaSyDyJUJ-eo4Fxxm0Ng0ITNk2XCXxj1GIqn4";
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY, authData)
        .then(response => console.log(response))
}