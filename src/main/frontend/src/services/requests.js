import axios from 'axios';
import authHeader from './auth-header';

const PUBLIC_API_URL = "http://localhost:8080/api/public/";
const USERS_API_URL = "http://localhost:8080/api/users/";
const ANIMALS_API_URL = "http://localhost:8080/api/animals/";

class RequestService {
    // get requests
    getAllUsers() {
        return axios.get(USERS_API_URL + 'all', {
            headers: authHeader()
        });
    }

    getAllAnimals() {
        return axios.get(ANIMALS_API_URL + 'all', {
            headers: authHeader()
        });
    }

    // post requests
    postLogin(parameters, chechIsLoginIn) {
        return axios.post(PUBLIC_API_URL +  'login', parameters).then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                chechIsLoginIn();
            }
        });
    }

    postRegister(parameters, chechIsLoginIn) {
        return axios.post(PUBLIC_API_URL + 'register', parameters).then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                chechIsLoginIn();
            }
        });
    }
}

export default new RequestService();