import React from "react";
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";
//Services
import RequestService from '../services/requests'

import Header from "../components/Headers/Header";

const Users = (props) => {
    const [usersData, setAnimalsData] = useState(null);
    const [activeNav, setActiveNav] = useState(1);

    React.useEffect(async () => {
        const allUsersData = await getAllUsers().then(response => { return response.data });
        const mappedUsers = mapAllUsers(allUsersData)
        setAnimalsData(mappedUsers);
    }, []);

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        // setChartExample1Data("data" + index);
    };

    const getAllUsers = () => {
        return RequestService.getAllUsers();
    }

    const mapAllUsers = (data) => {
        if (data == null) return;
        return data.map((user) => {
            return (
                <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.username}</td>
                </tr>
            )
        });
    }

    return (
        <>
            {/* Total header content */}
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* All Users */}
                <Row className="mt-5">
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">All Users</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Users;