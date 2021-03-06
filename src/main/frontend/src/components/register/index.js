import React, { Component } from 'react'
import RequestService from '../../services/requests'
import UserHeader from '../Headers/UserHeader';

export class Register extends Component {

    state = {
        username: "",
        password: "",
        passwordConfirm: ""
    }

    submitForm = (e) => {
        e.preventDefault();
        RequestService.postRegister(this.state).then(responce => {
            console.log(responce);
        });

        console.log('data send = ', this.state);

        this.props.chechIsLoginIn();
    }

    onChangeInputHandler = (e) => {
        var target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        const { username, password, passwordConfirm } = this.state;
        console.log(this);
        return (
            <>
                <UserHeader logout={this.props.logout} />

                <div className="row mt-5">
                    <div className="col-md-4 offset-md-4">
                        <h1>Реєстрація на сайт</h1>

                        <form onSubmit={this.submitForm}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Логін</label>
                                <input type="text" className="form-control"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={this.onChangeInputHandler} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <input type="password" className="form-control"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChangeInputHandler} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordConfirm" className="form-label">Підтвердження Паролю</label>
                                <input type="password" className="form-control"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={this.onChangeInputHandler} />
                            </div>
                            <button type="submit" className="btn btn-primary">Зареєструватись</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Register;