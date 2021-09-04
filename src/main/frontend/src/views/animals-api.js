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

const Animals = (props) => {
    const [animalsData, setAnimalsData] = useState(null);
    const [activeNav, setActiveNav] = useState(1);

    React.useEffect(async () => {
        const allAnimalsData = await getAllAnimals().then(response => { return response.data });
        const mappedAnimals = mapAllAnimals(allAnimalsData)
        setAnimalsData(mappedAnimals);
    }, []);

    const getAllAnimals = () => {
        return RequestService.getAllAnimals();
    }

    const mapAllAnimals = (data) => {
        if (data == null) return;
        return data.map((animal) => {
            return (
                <tr>
                    <th scope="row">{animal.id}</th>
                    <td>{animal.name}</td>
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
                {/* All Animals */}
                <Row className="mt-5">
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">All Animals</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {animalsData}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Animals;