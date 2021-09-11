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
import { Modal } from 'bootstrap'
//Services
import RequestService from '../services/requests'

import Header from "../components/Headers/Header";

const Hostels = (props) => {
    const [hostelsData, setHostelsData] = useState(null);
    const [animalsData, setAnimalsData] = useState(null);
    const [modalsData, setModalsData] = useState(null);
    const [activeNav, setActiveNav] = useState(1);

    React.useEffect(async () => {
        const allHostelsData = await getAllHostels().then(response => { return response.data });

        const mappedHostels = mapAllHostels(allHostelsData)
        setHostelsData(mappedHostels);
    }, []);

    const getAllHostels = () => {
        return RequestService.getAllHostels();
    }

    const getAnimalsByHostel = (hostel_id) => {
        return RequestService.getAnimalsByHostel(hostel_id);
    }

    const handleHostelClick = async (e) => {
        const target = e.target;

        let data = await getAnimalsByHostel(target.name).then(response => { return response.data });
        console.log(data)

        const mappedAnimals = mapAllAnimals(data);
        setAnimalsData(mappedAnimals);
    }

    const mapAllHostels = (data) => {
        if (data == null) return;

        return data.map((hostel) => {
            return (
                <tr >
                    <th scope="row">{hostel.id}</th>
                    <td>{hostel.name}</td>
                    <td>{hostel.adress}</td>
                    <td>
                        <button name={hostel.id} onClick={handleHostelClick} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#show-modal" + hostel.id}> {/*data-bs-toggle="modal" data-bs-target={"#show-modal" + hostel.id} */}
                            All Animals
                        </button>

                        {console.log("12")}{ mapAllModeles(data)}
                    </td>
                </tr>
            )
        });
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

    const mapAllModeles = (data, mappedAnimals) => {
        if (data == null) return;

        return data.map((hostel) => {
            return (
                <div class="modal fade" id={"show-modal" + hostel.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">All Animals</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
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
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                        <th scope="col">Animals</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostelsData}
                                    {/* {modalsData} */}
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