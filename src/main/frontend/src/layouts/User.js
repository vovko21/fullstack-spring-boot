import React, { Component } from "react";
import { useState } from "react";

import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "../components/Navbars/UserNavbar";
import Sidebar from "../components/Sidebar/Sidebar";

export default class User extends Component {

  state = {
    user_routes: null,
    mapped_routes: null,
    isLoginIn: null,
  }

  componentWillMount() {
    const { allUserRoutes, isLoginIn } = this.props;
    this.setState({ user_routes: allUserRoutes, isLoginIn: isLoginIn});
    this.setState({ mapped_routes: this.getRoutes(allUserRoutes) });
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          render={props => prop.component}
          key={key}
        />
      );
    });
  };

  render() {
    return (
      <>
        <Sidebar
          routes={this.state.user_routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/argon-react.png").default,
            imgAlt: "...",
          }}
        />
        <div className="main-content">
          <UserNavbar logout={this.props.logout} isLoginIn={this.state.isLoginIn} />

          <Switch>
            {this.state.mapped_routes}
            <Redirect from="/" to="index"></Redirect>
          </Switch>
          <Container fluid>
          </Container>
        </div>
      </>
    );
  }
};