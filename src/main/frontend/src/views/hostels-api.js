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

const Hostels = (props) => {
    const [hostelsData, setHostelsData] = useState(null);
    const [activeNav, setActiveNav] = useState(1);

    React.useEffect(async () => {
        const allHostelsData = await getAllHostels().then(response => { return response.data });
        const mappedHostels = mapAllHostels(allHostelsData)
        setHostelsData(mappedHostels);
    }, []);

    const getAllHostels = () => {
        return RequestService.getAllHostels();
    }

    const mapAllHostels = (data) => {
        if (data == null) return;
        return data.map((hostel) => {
            return (
                <tr>
                    <th scope="row">{hostel.id}</th>
                    <td>{hostel.name}</td>
                    <td>{hostel.adress}</td>
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
                {/* All Hostels */}
                <Row className="mt-5">
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">All Hostels</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Adress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostelsData}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Hostels;