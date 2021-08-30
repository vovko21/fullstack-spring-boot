import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {

    componentDidMount() {
        this.props.chechIsLoginIn();
    }

    logout = () => {
        localStorage.removeItem('user');
        this.props.chechIsLoginIn();
    }

    render() {
        if (this.props.isLoginIn) {
            return (
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                    <div className="container-fluid">
                        <a className="navbar-brand" href=""></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExample03">
                            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                                <li className="nav-item" >
                                    <Link className="nav-link active" aria-current="page" to="/">Головна</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto mb-2 mb-sm-0">
                                <li className="nav-item">
                                    <Link onClick={this.logout}>Вийти</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                    <div className="container-fluid">
                        <a className="navbar-brand" href=""></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExample03">
                            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                                <li className="nav-item" >
                                    <Link className="nav-link active" aria-current="page" to="/">Головна</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Вхід</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Реєстрація</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        }
    }
}

export default Navbar