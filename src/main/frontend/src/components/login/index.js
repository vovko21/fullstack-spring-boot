import React, { Component } from 'react'
import RequestService from '../../services/requests'

export class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    submitForm = (e) => {
        e.preventDefault();
        RequestService.postLogin(this.state, this.props.chechIsLoginIn);
    }

    onChangeInputHandler = (e) => {
        var target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }
    
    render() {
        const {username, password} = this.state;
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