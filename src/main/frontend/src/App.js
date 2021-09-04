import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Navbar from './components/Navbars/UserNavbar';
import Register from './components/register';

import "../src/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/assets/scss/argon-dashboard-react.scss";

import AdminLayout from './layouts/Admin';
import { EnrollAnimal } from './components/EnrollAnimal/enroll-animal';

class App extends Component {
  state = {
    isLoginIn: null,
    userRoles: "",
  }

  async componentDidMount() {
    let user = this.chechIsLoginIn();
    await this.chechUserRole(user);
  }

  chechIsLoginIn = () => {
    let user = localStorage.getItem('user');
    if (user != undefined) {
      this.setState({isLoginIn: true});
    } else {
      this.setState({isLoginIn: false});
    }
    return user;
  }

  async chechUserRole (user) {
    if(user == null) return;
    let userObj = JSON.parse(user);
    let userRoleNames = [];

    for (let index = 0; index < userObj.roles.length; index++) {
      userRoleNames[index] = userObj.roles[index].name;
    }

    this.setState({userRoles: userRoleNames});
  }

  render() {
    if(this.state.userRoles.includes('admin')) {
      return (
        <Router>
          <Switch>
            {/* Client Routes */}
            <Route exact path="/">
              <Navbar isAdmin={true} chechIsLoginIn={this.chechIsLoginIn} isLoginIn={this.state.isLoginIn} />
              <div className="container">
                <Home />
              </div>
            </Route>
            {/* Auth Routes */}
            <Route path="/login">
              <Navbar isAdmin={true} chechIsLoginIn={this.chechIsLoginIn} isLoginIn={this.state.isLoginIn} />
              <div className="container">
                <Login chechIsLoginIn={this.chechIsLoginIn} />
              </div>
            </Route>
            <Route path="/register">
              <Navbar isAdmin={true} chechIsLoginIn={this.chechIsLoginIn} isLoginIn={this.state.isLoginIn} />
              <div className="container">
                <Register chechIsLoginIn={this.chechIsLoginIn}/>
              </div>
            </Route>
            <Route path="/enroll">
              <Navbar chechIsLoginIn={this.chechIsLoginIn} isLoginIn={this.state.isLoginIn} />
              <div className="container">
                <EnrollAnimal />
              </div>
            </Route>
            {/* Admin Layout */}
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          </Switch>
        </Router>
      );
    } else if (!this.state.userRoles.includes('admin')) {
      return (
        <Router>
          <Switch>
            {/* Client Routes */}
            <Route exact path="/">
              <Navbar chechIsLoginIn={this.chechIsLoginIn} isLoginIn={this.state.isLoginIn} />
              <div className="container">
                <Home />
              </div>
            </Route>
            {/* Auth Routes */}
            <Route path="/login">
              <Navbar chechIsLoginIn={this.chechIsLoginIn} isLoginIn={this.state.isLoginIn} />
              <div className="container">
                <Login chechIsLoginIn={this.chechIsLoginIn} />
              </div>
            </Route>
            <Route path="/register">
              <Navbar chechIsLoginIn={this.chechIsLoginIn} isLoginIn={this.state.isLoginIn} />
              <div className="container">
                <Register chechIsLoginIn={this.chechIsLoginIn}/>
              </div>
            </Route>
            <Route path="/enroll">
              <Navbar chechIsLoginIn={this.chechIsLoginIn} isLoginIn={this.state.isLoginIn} />
              <div className="container">
                <EnrollAnimal />
              </div>
            </Route>
          </Switch>
        </Router>
      );
    }
  }
}

export default App;