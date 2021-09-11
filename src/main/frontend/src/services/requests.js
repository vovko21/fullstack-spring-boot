import axios from 'axios';
import authHeader from './auth-header';

const PUBLIC_API_URL = "http://localhost:8080/api/public/";
const USERS_API_URL = "http://localhost:8080/api/users/";
const ANIMALS_API_URL = "http://localhost:8080/api/animals/";
const HOSTELS_API_URL = "http://localhost:8080/api/hostels/";

class RequestService {
    //|============|
    //|GET requests|
    //|============|
    //Users
    getAllUsers() {
        return axios.get(USERS_API_URL + 'all', {
            headers: authHeader()
        });
    }

    getCountAllUsers() {
        return axios.get(USERS_API_URL + 'count', {
            headers: authHeader()
        });
    }

    //Animals
    getAllAnimals() {
        return axios.get(ANIMALS_API_URL + 'all', {
            headers: authHeader()
        });
    }

    getFirstAnimals(count) {
        return axios.get(ANIMALS_API_URL + 'limit=' + count, {
            headers: authHeader()
        });
    }

    getCountAllAnimals() {
        return axios.get(ANIMALS_API_URL + 'count', {
            headers: authHeader()
        });
    }

    getAnimalsByHostel(hostel_id) {
        return axios.get(PUBLIC_API_URL + 'get-animals-' + hostel_id);
    }

    //Hostels
    getAllHostels() {
        return axios.get(HOSTELS_API_URL + 'all', {
            headers: authHeader()
        });
    }

    getCountAllHostels() {
        return axios.get(HOSTELS_API_URL + 'count', {
            headers: authHeader()
        });
    }

    //|=============|
    //|POST requests|
    //|=============|
    //Auth
    postLogin(parameters) {
        return axios.post(PUBLIC_API_URL +  'login', parameters).then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        });
    }

    postRegister(parameters) {
        return axios.post(PUBLIC_API_URL + 'register', parameters).then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        });
    }

    //Enroll
    postEnroll(parameters) {
        return axios.post(PUBLIC_API_URL + 'enroll', parameters);
    }
}

export default new RequestService();