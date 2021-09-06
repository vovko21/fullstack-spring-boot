import React, { Component } from 'react'
import { flushSync } from 'react-dom';
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Alert,
} from "reactstrap";
import RequestService from '../../services/requests'

export class EnrollAnimal extends Component {
    state = {
        hostelsList: null,
        submit: { animalName: "", hostelId: -1 },
        alert: { color: "", message: "" },
    }

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        await this.loadHostelsList();
    }

    async loadHostelsList() {
        const allHostels = await this.getAllHostels().then(response => { return response.data });

        this.setState({ hostelsList: this.mapHostelsList(allHostels) });
    }

    mapHostelsList(data) {
        if (data == null) return;
        return data.map((hostel) => {
            return (
                <option value={hostel.id}>
                    {hostel.name} | {hostel.adress}
                </option>
            )
        });
    }

    getAllHostels() {
        return RequestService.getAllHostels();
    }

    async onSubmit(e) {
        e.preventDefault();

        let target = e.target;
        this.setState({
            submit: { animalName: target['exampleName'].value, hostelId: target['exampleSelect'].value }
        }, function () { console.log(this.state); });

        let status = await RequestService.postEnroll(this.state.submit).then((response) => { return response.data });

        if (status == "CREATED") {
            this.setState({ alert: { color: "success", message: "Your animal enrolle to the hostel" } });
        } else {
            this.setState({ alert: { color: "danger", message: "Fill all fields" } });
        }
    }

    render() {
        if (this.state.alert.color != "") {
            return (
                <>
                    <Container className="mt-5">
                        <Alert color={this.state.alert.color}>
                            {this.state.alert.message}
                        </Alert>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleName">Animal name</Label>
                                <Input type="text"
                                    name="animalName"
                                    id="exampleName"
                                    placeholder="How you called an animal" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleSelect">Select Hostel</Label>
                                <Input type="select"
                                    name="hostelId"
                                    id="exampleSelect">
                                    {this.state.hostelsList}
                                </Input>
                            </FormGroup>

                            <Button>Submit</Button>
                        </Form>
                    </Container>
                </>
            );
        } else {
            return (
                <>
                    <Container className="mt-5">
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleName">Animal name</Label>
                                <Input type="text"
                                    name="animalName"
                                    id="exampleName"
                                    placeholder="How you called an animal" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleSelect">Select Hostel</Label>
                                <Input type="select"
                                    name="hostelId"
                                    id="exampleSelect">
                                    {this.state.hostelsList}
                                </Input>
                            </FormGroup>

                            <Button>Submit</Button>
                        </Form>
                    </Container>
                </>
            );
        }
    }
}

export default EnrollAnimal;