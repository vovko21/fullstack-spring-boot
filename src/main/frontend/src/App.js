import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "../src/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/assets/scss/argon-dashboard-react.scss";

import AdminLayout from './layouts/Admin';
import UserLayout from './layouts/User';
import EnrollAnimal from './components/EnrollAnimal/enroll-animal';

import userRoutes from "../src/routes-user";

class App extends Component {
  state = {
    isLoginIn: null,
    userRoles: "",
    user_routes: null,
  }

  async componentWillMount() {
    let user = this.chechIsLoginIn();
    await this.chechUserRole(user);
  }

  chechIsLoginIn() {
    console.log(userRoutes(this.state.isLoginIn, this.state.userRoles, this.chechIsLoginIn).userroutes);
    let user = localStorage.getItem('user');
    if (user != null) {
      this.setState({ isLoginIn: true }, () => {
        this.setState({ user_routes: userRoutes(this.state.isLoginIn, this.state.userRoles, this.chechIsLoginIn).userroutes });
      });
    } else {
      this.setState({ isLoginIn: false }, () => {
        this.setState({ user_routes: userRoutes(this.state.isLoginIn, this.state.userRoles, this.chechIsLoginIn).userroutes });
      });
    }
    return user;
  }

  async chechUserRole(user) {
    if (user == null) return;
    let userObj = JSON.parse(user);
    let userRoleNames = [];

    for (let index = 0; index < userObj.roles.length; index++) {
      userRoleNames[index] = userObj.roles[index].name;
    }

    this.setState({ userRoles: userRoleNames });
  }

  logout () {
    localStorage.removeItem("user");
    // this.chechIsLoginIn();
  }

  render() {
    if(this.state.user_routes == null){
      return (<div>WAIT</div>)
    }
    if (this.state.userRoles.includes('admin')) {
      return (
        <Router>
          <Switch>
            {/* Admin Layout */}
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            {/* User Layout */}
            <Route path="/" render={(props) => <UserLayout
              isLoginIn={this.state.isLoginIn}
              chechIsLoginIn={this.chechIsLoginIn}
              userRoles={this.state.userRoles}
              allUserRoutes={this.state.user_routes}
              logout={this.logout}
            />}
            />
          </Switch>
        </Router>
      );
    } else if (!this.state.userRoles.includes('admin')) {
      return (
        <Router>
          <Switch>
            {/* User Layout */}
            <Route path="/" render={(props) => <UserLayout
              isLoginIn={this.state.isLoginIn}
              chechIsLoginIn={this.chechIsLoginIn}
              userRoles={this.state.userRoles}
              allUserRoutes={this.state.user_routes}
            />}
            />
          </Switch>
        </Router>
      );
    }
  }
}

export default App;