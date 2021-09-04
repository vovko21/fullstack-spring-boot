import React, { Component } from 'react'
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    FormText,
    Row,
    Col,
} from "reactstrap";
import RequestService from '../../services/requests'

export class EnrollAnimal extends Component {
    state = {
        hostelsList: null,
        submit: {animalName: "", hostelId: -1}
    }

    async componentDidMount () {
        await this.loadHostelsList();
    }

    async loadHostelsList () {
        const allHostels = await this.getAllHostels().then(response => {return response.data});
        // let hostelsList = [];
        // for (let index = 0; index < allHostels.length; index++) {
        //     const element = allHostels[index];
        //     hostelsList[index] = element.name;
        // }

        this.setState({hostelsList: this.mapHostelsList(allHostels)});
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

    getAllHostels () {
        return RequestService.getAllHostels();
    }

    onSubmit (e) {
        e.preventDefault();
        RequestService.postEnroll(this.state.submit);
    }

    onChangeInputHandler = (e) => {
        var target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        const {animalName, hostelId} = this.state.submit;
        return (
            <>
                <Container className="mt-5">
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail">Animal name</Label>
                            <Input type="text" 
                                name="animalName" 
                                id="exampleEmail" 
                                placeholder="How you called an animal" 
                                value={animalName}
                                onChange={this.onChangeInputHandler}/>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="exampleSelect">Select Hostel</Label>
                            <Input type="select" 
                                name="hostelId" 
                                id="exampleSelect"
                                value={hostelId}
                                onChange={this.onChangeInputHandler}>
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

export default EnrollAnimal