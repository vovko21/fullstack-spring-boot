import axios from 'axios';
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

export class Login extends Component {

    // componentDidMount=() =>{
    //     this.props.history.push('/');
    // }
    state = {
        username: "222",
        password: ""
    }
    submitForm = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/public/login", this.state)
            .then(responce => {
                console.log(responce);
            });
        console.log('data send = ', this.state);
    }

    onChangeInputHandler = (e) => {
        var target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }
    
    render() {
        const {username, password} = this.state; //дестурктуризація
        console.log(this);
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h1>Вхід на сайт</h1>
                    
                    <form onSubmit = {this.submitForm}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Логін</label>
                            <input type="text" className="form-control" 
                                id="username" 
                                name="username" 
                                value={username}
                                onChange={this.onChangeInputHandler}/>
                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Пароль</label>
                            <input type="password" className="form-control" 
                                id="password" 
                                name="password"
                                value={password}
                                onChange={this.onChangeInputHandler} />
                        </div>
                        <button type="submit" className="btn btn-primary">Вхід</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;