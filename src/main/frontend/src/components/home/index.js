import React, { Component } from 'react'
import RequestService from '../../services/requests'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class Home extends Component {
  state = {
    users: [],
    userList: []
  }

  componentDidMount() { 
    this.loadAllUsers();
  }

  loadAllUsers = () => {
    RequestService.getAllUsers().then(responce => {
      if (responce != null) {
        this.setState({ users: responce.data });
      }
    });

    this.setState({userList: this.mapUsers(this.state.users)});
  }

  mapUsers = (data) => {
    return data.map((user) => {
      return (
        <tr>
          <th scope="row">{user.id}</th>
          <td>{user.username}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userList}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" onClick={this.loadAllUsers}>Update List</button>
      </>
    );
  }
}

export default Home