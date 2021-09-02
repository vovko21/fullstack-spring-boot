import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Navbar from './components/Navbars/UserNavbar';
import Register from './components/register';

import AdminLayout from './layouts/Admin';

class App extends Component {
  state = {
    isLoginIn: null,
  }

  componentDidMount() {
    this.chechIsLoginIn();
  }

  chechIsLoginIn = () => {
    let user = localStorage.getItem('user');
    console.log('User: ' + user);
    if (user != undefined) {
      this.setState({isLoginIn: true});
    } else {
      this.setState({isLoginIn: false});
    }
  }

  render() {
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
          {/* Admin Layout */}
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;