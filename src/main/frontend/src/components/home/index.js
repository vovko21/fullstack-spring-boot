import axios from 'axios';
import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export class Home extends Component {
    state = {
        users: [],
    }

    render() {
        axios.get("http://localhost:8080/api/public/allusers").then(responce => {
            console.log(responce);
            if (responce != null) {
                this.state.users = responce;
            }
        });

        return (
            <BootstrapTable data={this.state.users}>
                <TableHeaderColumn isKey dataField='id'>
                    ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField='username'>
                    Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField='fullname'>
                    Fullname
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default Home