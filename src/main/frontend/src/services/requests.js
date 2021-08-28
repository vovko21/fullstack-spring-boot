import axios from 'axios';
import React, { Component } from 'react'
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/public/";

class RequestService {
    getAllUsers() {
        return axios.get(API_URL +  'allusers', {headers: authHeader()});
    }

    postLogin(parameters) {
        return axios.post(API_URL +  'login', parameters).then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
        });
    }

    postRegister(parameters) {
        return axios.post(API_URL + 'register', parameters)
    }
}

export default new RequestService();