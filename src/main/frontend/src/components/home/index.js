import React, { Component } from 'react'
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
import RequestService from '../../services/requests'

export class Home extends Component {
  state = {
  }

  render() {
    return (
      <>
        <Container className="mt-5">
          <Row>
            <Col className="d-flex justify-content-center">
              <h1 className="text-uppercasels-1 mb-1">Welcome to Animal Hostels</h1>
            </Col>
          </Row>
          <Col className="mt-5 mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Start here
                    </h6>
                    <h2 className="mb-0 align-items-center">Send your animal to the hostel</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="d-flex justify-content-center">
                <Button color="primary" href="enroll">Enroll my animal</Button>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </>
    );
  }
}

export default Home