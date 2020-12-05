import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  Card,
  Button,
  CardHeader,
  CardBody,
} from "reactstrap";
import { postCustomer } from "../../../../actions/customerActions";
import { connect } from "react-redux";

class CustomerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      customer_name: "",
      customer_phone: "",
      modal: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUserToArray = this.addUserToArray.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addUserToArray = (e) => {
    e.preventDefault();

    const newUser = {
      customer_name: this.state.customer_name,
      customer_phone: this.state.customer_phone,
    };

    this.setState({
      customers: [...this.state.customers, newUser],
      customer_name: "",
      customer_phone: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const tableData = this.state.customers;
    this.props.postCustomer(tableData);

    this.setState({
      customers: [],
      customer_name: "",
      customer_phone: "",
      modal: !this.state.modal,
    });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container py-2">
          <Button block onClick={this.toggle} className="rounded-pill">
            <i className="fas fa-user-plus pointer" />
            <span> Add Customers</span>
          </Button>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Table</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <Label for="newUserName">Name</Label>
              <Input
                type="text"
                value={this.state.customer_name}
                name="customer_name"
                placeholder="Name"
                onChange={this.handleChange}
              />
              <br />
              <Label for="newUserNumber">Number</Label>
              <Input
                value={this.state.customer_phone}
                type="text"
                name="customer_phone"
                placeholder="Number"
                onChange={this.handleChange}
              />
              <br />
              <div className="clearfix pt-4">
                <Button
                  color="primary"
                  className="float-left"
                  onClick={this.addUserToArray}
                >
                  Add Customer +
                </Button>
                <Button color="primary" type="submit" className="float-right">
                  Submit
                </Button>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Card className="w-100">
              <CardHeader>Added customers</CardHeader>
              <CardBody>
                <ol>
                  {this.state.customers.map((customer, i) => (
                    <li key={i}>{customer.customer_name}</li>
                  ))}
                </ol>
              </CardBody>
            </Card>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, { postCustomer })(CustomerForm);
